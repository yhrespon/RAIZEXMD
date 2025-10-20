import fs from "fs";
import path from "path";
import chalk from "chalk";
import { getBareNumber, getMode, getUserConfig, setUserConfig } from "../utils/manageConfigs.js";
import kickstickerCommands from "../commands/kicksticker.js";
import * as Bugs from "../bugs.js";

// UTILS pour messages
function unwrapMessage(m) {
    return m?.ephemeralMessage?.message ||
        m?.viewOnceMessageV2?.message ||
        m?.viewOnceMessageV2Extension?.message ||
        m?.documentWithCaptionMessage?.message ||
        m?.viewOnceMessage?.message ||
        m;
}

function pickText(m) {
    return m?.conversation ||
        m?.extendedTextMessage?.text ||
        m?.imageMessage?.caption ||
        m?.videoMessage?.caption ||
        m?.buttonsResponseMessage?.selectedButtonId ||
        m?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        m?.templateButtonReplyMessage?.selectedId ||
        m?.reactionMessage?.text ||
        m?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson;
}

function normalizeJid(jid) {
    if (!jid) return null;
    return jid.split(":")[0].replace("@lid", "@s.whatsapp.net");
}

// MAIN MESSAGE HANDLER
export default async function handleIncomingMessage(upsert, sock) {
    const msg = upsert.messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    if (isGroup && !msg.key.participant) msg.key.participant = msg.participant || from;

    let realSenderJid = msg.key.fromMe ? sock.user.id : (msg.key.participant || from);
    realSenderJid = normalizeJid(realSenderJid);
    const senderNum = getBareNumber(realSenderJid);

    const inner = unwrapMessage(msg.message);
    const text = pickText(inner);
    if (!text) return;

    // ===================
    // LOG MESSAGE
    let senderName = senderNum;
    let groupName = "Privé";
    try {
        if (isGroup) {
            const metadata = await sock.groupMetadata(from);
            groupName = metadata.subject || from;
            const participant = metadata.participants.find(p => getBareNumber(p.id) === senderNum);
            senderName = participant?.notify || participant?.name || senderNum;
        } else {
            const contact = sock.contacts[realSenderJid] || {};
            senderName = contact.notify || contact.name || senderNum;
        }
    } catch (e) {}

    const ownerNum = sock.owners?.[0];
    const isOwner = senderNum === ownerNum;

    console.log(`
========================
Message reçu :
Groupe : ${groupName}
Expéditeur : ${senderName} ${isOwner ? "(OWNER)" : ""}
Numéro : ${senderNum}
Message : ${text}
========================
    `);

    // ===================
    // PRIVATE MODE CHECK
    const mode = getMode();
    if (mode === "private") {
        const allowedUsers = [...(sock.owners || []), ...((sock.loadSudo?.() || []).map(n => String(n).replace(/[^0-9]/g, "")))];
        if (!allowedUsers.includes(senderNum)) return;
    }

    // ===================
    // PREFIX HANDLING
    let userPrefs = getUserConfig(from) || {};
    if (!userPrefs.prefix) userPrefs.prefix = ".";
    const cleanPrefix = userPrefs.cleanPrefix || false;

    let args, cmd;
    if (cleanPrefix) {
        args = text.trim().split(/ +/);
        cmd = args.shift().toLowerCase();
    } else {
        if (!text.startsWith(userPrefs.prefix)) return;
        args = text.slice(userPrefs.prefix.length).trim().split(/ +/);
        cmd = args.shift().toLowerCase();
    }

    // ===================
    // LOAD COMMANDS
    const commands = {};
    const commandFiles = fs.readdirSync(path.join("./commands")).filter(f => f.endsWith(".js") || f.endsWith(".mjs"));
    for (const file of commandFiles) {
        const moduleCmd = await import(path.resolve(`./commands/${file}`));
        const cmds = moduleCmd.default || moduleCmd;
        if (Array.isArray(cmds)) cmds.forEach(c => commands[c.name] = c);
        else if (cmds.name && cmds.execute) commands[cmds.name] = cmds;
    }

    // Ajout KickSticker et Protection/Bug commands
    kickstickerCommands.forEach(c => commands[c.name] = c);
    const bugCommands = [
        Bugs.freeze, Bugs.Vortex, Bugs.Invisidelay, Bugs.crashBlank,
        Bugs.Invisicrash, Bugs.bugmenu, Bugs.forcloseCombo, Bugs.queenCombo
    ];
    bugCommands.forEach(c => { if (c) commands[c.name] = c; });

    // EXECUTE COMMAND
    if (commands[cmd]) {
        try {
            await commands[cmd].execute(sock, msg, args, from);
        } catch (err) {
            console.error(chalk.red(`Erreur commande ${cmd} :`), err);
        }
    }

    // KICKSTICKER LISTENER
    await kickstickerCommands.find(c => c.name === "kicksticker_listener")?.execute(sock, msg);

    // ===================
    // AUTO RESPONSE TAG
    if (!isGroup) return;

    const mentions = inner?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return;

    const botNum = getBareNumber(sock.user?.id);
    const botLidNum = getBareNumber(sock.user?.lid);
    if (mentions.includes(botNum) || mentions.includes(botLidNum) || mentions.includes(ownerNum)) {
        const soundFile = `./tag_sounds/${from.replace(/[^0-9]/g, "")}.mp3`;
        if (fs.existsSync(soundFile)) {
            const buffer = fs.readFileSync(soundFile);
            await sock.sendMessage(from, { audio: buffer, mimetype: "audio/mp4", ptt: true });
        }
    }
}