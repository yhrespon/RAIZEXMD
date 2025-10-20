import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";

import fs from "fs";
import path from "path";
import pino from "pino";
import { initProtections } from "./protections.js";
import { initSecurity } from "./security.js";
import { welcomeEvents } from "./commands/welcome.js";
import { autoreactEvents } from "./commands/autoreact.js";
import { autoreadEvents } from "./commands/autoread.js";
import { autotypingEvents } from "./commands/autotyping.js";
import { autoreadstatusEvents } from "./commands/autoreadstatus.js";
import { autobioEvents } from "./commands/autobio.js";
import { autobvnEvents } from "./commands/autobvn.js";
import { autorecordingEvents } from "./commands/autorecording.js";
import statusLike from "./events/statuslike.js";
import kickstickerCommands from "./commands/kicksticker.js";
import { antideleteEvents } from "./commands/antidelete.js";
import securityCommands from "./commands/security.js";
import protectionCommands from "./commands/protectionCommands.js";
import * as Bugs from "./bugs.js";
import handleIncomingMessage from "./events/messageHandler.js";

const SESSIONS_FILE = "./sessions.json";
const sessions = {};

function saveSessionNumber(number) {
    let sessionsList = [];
    if (fs.existsSync(SESSIONS_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE));
            sessionsList = Array.isArray(data.sessions) ? data.sessions : [];
        } catch {
            sessionsList = [];
        }
    }
    if (!sessionsList.includes(number)) {
        sessionsList.push(number);
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
    }
}

function removeSession(number) {
    console.log(`❌ Removing session data for ${number}`);
    if (fs.existsSync(SESSIONS_FILE)) {
        let sessionsList = [];
        try {
            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE));
            sessionsList = Array.isArray(data.sessions) ? data.sessions : [];
        } catch {
            sessionsList = [];
        }
        sessionsList = sessionsList.filter(num => num !== number);
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
    }
    const sessionPath = `./sessions/${number}`;
    if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
    delete sessions[number];
    console.log(`✅ Session for ${number} fully removed.`);
}

async function startSession(targetNumber, message, mainSock) {
    console.log(`🚀 Starting session for: ${targetNumber}`);
    const sessionPath = `./sessions/${targetNumber}`;
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    let sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        if (connection === "close") {
            console.log(`❌ Session closed for: ${targetNumber}`);
            const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.message;
            const shouldReconnect = reason !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                console.log(`🔄 Reconnecting to ${targetNumber}...`);
                await startSession(targetNumber, message, mainSock);
            } else {
                console.log(`❌ Logged out, removing session for ${targetNumber}`);
                removeSession(targetNumber);
            }
        } else if (connection === "open") {
            console.log(`✅ Session open for ${targetNumber}`);
        }
    });

    // Init events / protections
    initProtections(sock);
    initSecurity(sock);
    welcomeEvents(sock);
    autoreactEvents(sock);
    autorecordingEvents(sock);
    autoreadEvents(sock);
    autotypingEvents(sock);
    autoreadstatusEvents(sock);
    autobioEvents(sock);
    autobvnEvents(sock);
    antideleteEvents(sock);
    statusLike(sock);

    // Charger commandes
    const commands = {};
    const commandFiles = fs.readdirSync(path.join("./commands")).filter(f => f.endsWith(".js") || f.endsWith(".mjs"));
    for (const file of commandFiles) {
        const moduleCmd = await import(path.resolve(`./commands/${file}`));
        const cmds = moduleCmd.default || moduleCmd;
        if (Array.isArray(cmds)) cmds.forEach(c => commands[c.name] = c);
        else if (cmds.name && cmds.execute) commands[cmds.name] = cmds;
    }

    kickstickerCommands.forEach(c => commands[c.name] = c);
    protectionCommands.forEach(c => commands[c.name] = c);
    securityCommands.forEach(c => commands[c.name] = c);

    const bugCommands = [Bugs.freeze, Bugs.Vortex, Bugs.Invisidelay, Bugs.crashBlank, Bugs.Invisicrash, Bugs.bugmenu, Bugs.forcloseCombo, Bugs.queenCombo];
    bugCommands.forEach(c => { if (c) commands[c.name] = c; });

    sock.ev.on("messages.upsert", async ({ messages }) => { await handleIncomingMessage({ messages }, sock); });

    // ✅ Gérer le code d’appairage
    setTimeout(async () => {
        try {
            if (!state.creds.registered) {
                const code = await sock.requestPairingCode(targetNumber);
                console.log(`[startSession] pairing code generated for ${targetNumber}:`, code);

                const spaced = code.split("").join(" ");

                if (!message || !mainSock) {
                    console.warn(`[startSession] Cannot send code to chat. message or mainSock missing.`);
                } else {
                    const remote = message.key?.remoteJid;
                    console.log(`[startSession] sending pairing code to ${remote}`);
                    await mainSock.sendMessage(remote, { text: `> _*${spaced}*_` });
                    console.log(`[startSession] code sent to ${remote}`);
                }
            } else {
                console.log(`[startSession] creds already registered for ${targetNumber}, no pairing code requested.`);
            }
        } catch (e) {
            console.error(`[startSession] failed requesting/sending pairing code for ${targetNumber}:`, e);
            if (message && mainSock) {
                try {
                    await mainSock.sendMessage(message.key.remoteJid, { text: `> _*❌ Erreur lors de la génération du code pour ${targetNumber}*_` });
                } catch {}
            }
        }
    }, 5000);

    // Timeout pairing expiré (ne réessaie pas)
    setTimeout(async () => {
        if (!state.creds.registered && message && mainSock) {
            await mainSock.sendMessage(message.key.remoteJid, { text: `> _*❌ Pairing expiré pour ${targetNumber}. Réessaie.*_` });
            removeSession(targetNumber);
            console.log(`❌ Pairing expired for ${targetNumber}, session removed.`);
        }
    }, 60000);

    sessions[targetNumber] = sock;
    saveSessionNumber(targetNumber);

    return sock;
}

async function reconnect(mainSock) {
    if (!fs.existsSync(SESSIONS_FILE)) return;
    const data = JSON.parse(fs.readFileSync(SESSIONS_FILE));
    const sessionNumbers = Array.isArray(data.sessions) ? data.sessions : [];
    for (const number of sessionNumbers) {
        console.log(`🔄 Reconnecting session for: ${number}`);
        try {
            await startSession(number, null, mainSock);
        } catch (error) {
            console.error(`❌ Failed session for ${number}:`, error);
            removeSession(number);
        }
    }
}

export { startSession, reconnect };