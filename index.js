// =======================
// IMPORTS
import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  jidDecode
} from "@whiskeysockets/baileys";

import chalk from "chalk";
import fs from "fs";
import path from "path";
import pino from "pino";
import readline from "readline";
import { execSync } from "child_process";

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
import { bugall } from "./bugall.js";

// =======================
// IMPORT BUGS
import * as Bugs from "./bugs.js";

// =======================
// EXPORT UTILITAIRES
export { getBareNumber, getMode, setMode, getUserConfig, setUserConfig, loadSudo, normalizeJid, unwrapMessage, pickText };

// =======================
// AUTO-INSTALL GTTS
let gTTS;
try {
  gTTS = (await import("gtts")).default;
} catch (e) {
  console.log("📦 gtts non trouvé, installation en cours...");
  try {
    execSync("npm install gtts", { stdio: "inherit" });
    gTTS = (await import("gtts")).default;
    console.log("✅ gtts installé avec succès !");
  } catch (err) {
    console.error("❌ Impossible d’installer gtts automatiquement :", err);
    process.exit(1);
  }
}

// =======================
// GLOBAL CONFIG
global.botPrefix = ".";
global.cleanPrefixEnabled = false;
const STATUS_REACT = "💚";
const MODE_FILE = "./mode.json";
const CONFIG_PATH = "./config.json";
const SUDO_FILE = "./sudo.json";

// =======================
// HELPERS
function getBareNumber(input) {
  if (!input) return "";
  const s = String(input);
  const beforeAt = s.split("@")[0];
  const beforeColon = beforeAt.split(":")[0];
  return beforeColon.replace(/[^0-9]/g, "");
}

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

function getConfig() {
  if (!fs.existsSync(CONFIG_PATH)) fs.writeFileSync(CONFIG_PATH, JSON.stringify({ users: {} }, null, 2));
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

function saveConfig(cfg) { fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2)); }
function getUserConfig(number) { return getConfig().users[number] || null; }
function setUserConfig(number, data) {
  const cfg = getConfig();
  cfg.users[number] = { ...(cfg.users[number] || {}), ...data };
  saveConfig(cfg);
}

function loadSudo() {
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

function getMode() {
  if (!fs.existsSync(MODE_FILE)) {
    fs.writeFileSync(MODE_FILE, JSON.stringify({ mode: "private" }, null, 2));
    return "private";
  }
  const data = JSON.parse(fs.readFileSync(MODE_FILE, "utf-8"));
  return data.mode || "private";
}

function setMode(newMode) {
  fs.writeFileSync(MODE_FILE, JSON.stringify({ mode: newMode }, null, 2));
}

function question(query) {
  process.stdout.write(query + "\n> ");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.on("line", input => { rl.close(); resolve(input); });
    process.stdout.write("");
  });
}

function afficherBanner() {
  console.log("\n🎉 DEV-RAIZEL 🎉\n");
}

// =======================
// SAFE JID DECODER
global.safeDecodeJid = function (jid) {
  if (!jid) return "";
  try {
    const decoded = jidDecode(jid);
    return decoded?.user ? `${decoded.user}@s.whatsapp.net` : jid;
  } catch {
    return jid.split("@")[0] + "@s.whatsapp.net";
  }
};

// =======================
// PATCH SOCKET
function patchSocket(sock) {
  const originalDecode = sock.decodeJid;
  sock.decodeJid = (jid) => {
    if (!jid) return "";
    try {
      const decoded = originalDecode ? originalDecode(jid) : jidDecode(jid);
      return decoded?.user ? `${decoded.user}@s.whatsapp.net` : jid;
    } catch {
      return jid;
    }
  };
  return sock;
}

// =======================
// START BOT
async function startPairing() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  let sock = makeWASocket({
    version,
    printQRInTerminal: false,
    logger: pino({ level: "silent" }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });
  sock = patchSocket(sock);
  global.surz = sock;
  global.asep = sock; 
    
  // PAIRING
  if (!state.creds.registered) {
    console.log(chalk.cyan("\n=== 🔗 CONFIGURATION DE L’APPAREIL ===\n"));
    const phoneNumber = await question(chalk.cyan.bold("📱 Entre ton numéro WhatsApp (ex: 2376XXXXXXXX): "));
    const code = await sock.requestPairingCode(phoneNumber.trim());
    console.log(chalk.greenBright("\n✅ Code d’appairage : ") + chalk.yellowBright.bold(code.split("").join(" ")));
  }

  // CONNECTION EVENTS
  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.greenBright("✅ Connecté à WhatsApp !"));
      afficherBanner();

      const ownerId = normalizeJid(sock.user?.id);
      const ownerBare = getBareNumber(ownerId);
      const ownerLid = sock.user?.lid ? getBareNumber(sock.user.lid) : null;
      global.owners = [ownerBare];
      if (ownerLid) global.owners.push(ownerLid);

      console.log(chalk.green(`✅ Propriétaire ID : ${ownerBare}`));
      console.log(chalk.yellow(`🏠 Propriétaire LID : ${ownerLid || "non disponible"}`));

      const ownerJid = ownerBare + "@s.whatsapp.net";

      if (!fs.existsSync("./.firstboot")) {
        fs.writeFileSync("./.firstboot", "done");

        const messageTexte = `
RAIZEL XMD BOT ET BUGBOT

📢 Rejoignez la communauté :
   • 📺 WhatsApp Channel : https://whatsapp.com/channel/0029Vb6DOLCCxoAvIfxngr3P
   • ✨ Telegram : https://t.me/RAIZEL_SUPPORT

💬 Contact :
   • WhatsApp : wa.me/237699777530
   • Telegram : t.me/devraizel

⚠️ Merci pour votre soutien !
By DEV-RAIZEL
        `;
        await sock.sendMessage(ownerJid, { video: { url: "https://files.catbox.moe/qiqdaw.mp4" }, caption: messageTexte });

        console.log(chalk.red("⚠️ Premier démarrage → redémarrage automatique dans 5s..."));
        setTimeout(() => process.exit(1), 5000);
        return;
      }
    } else if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.message;
      console.log(chalk.red("❌ Déconnecté :", reason));
      if (reason !== DisconnectReason.loggedOut) setTimeout(startPairing, 5000);
      else console.log(chalk.red("💀 Session expirée. Supprimez le dossier session et relancez."));
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // ===================
  // INIT PROTECTIONS & SECURITY
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

  // ADD SPECIAL COMMANDS
  kickstickerCommands.forEach(c => commands[c.name] = c);
  protectionCommands.forEach(c => commands[c.name] = c);
  securityCommands.forEach(c => commands[c.name] = c);

  const bugCommands = [
    Bugs.freeze, Bugs.Vortex, Bugs.Invisidelay, Bugs.crashBlank,
    Bugs.Invisicrash, Bugs.bugmenu, Bugs.forcloseCombo, Bugs.queenCombo
  ];
  bugCommands.forEach(c => { if (c) commands[c.name] = c; });

  // ===================
  // MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    if (isGroup && !msg.key.participant) msg.key.participant = msg.participant || msg.key.remoteJid;

    let realSenderJid = msg.key.fromMe ? sock.user.id : (msg.key.participant || from);
    try { realSenderJid = sock.decodeJid(realSenderJid); } catch { realSenderJid = normalizeJid(realSenderJid); }
    const senderNum = getBareNumber(realSenderJid);
    const inner = unwrapMessage(msg.message);
    const text = pickText(inner);
    if (!text) return;

    // ===================
    // LOG DES MESSAGES
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

    const ownerNum = global.owners?.[0];
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

    // PRIVATE MODE CHECK
    const mode = getMode();
    if (mode === "private") {
      const allowedUsers = [...(global.owners || []), ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))];
      if (!allowedUsers.includes(senderNum)) return;
    }

    // PREFIX HANDLING
    let userPrefs = getUserConfig(from) || {};
    if (!userPrefs.prefix) userPrefs.prefix = global.botPrefix;
    const cleanPrefix = userPrefs.cleanPrefix || global.cleanPrefixEnabled;

    let args, cmd;
    if (cleanPrefix) {
      args = text.trim().split(/ +/);
      cmd = args.shift().toLowerCase();
    } else {
      if (!text.startsWith(userPrefs.prefix)) return;
      args = text.slice(userPrefs.prefix.length).trim().split(/ +/);
      cmd = args.shift().toLowerCase();
    }

    if (commands[cmd]) {
      try { await commands[cmd].execute(sock, msg, args, from); } 
      catch (err) { console.error(chalk.red(`Erreur commande ${cmd} :`), err); }
    }

    // KICKSTICKER LISTENER
    await kickstickerCommands.find(c => c.name === "kicksticker_listener")?.execute(sock, msg);
  });

  // ===================
  // AUTO RESPONSE TAG
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || !msg.key.remoteJid.endsWith("@g.us")) return;

    const from = msg.key.remoteJid;
    const inner = unwrapMessage(msg.message);
    const text = pickText(inner);
    if (!text) return;

    const realSenderJid = msg.key.fromMe ? sock.user.id : (msg.key.participant || from);
    if (realSenderJid === sock.user.id) return;

    const mentions = inner?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const settingsFile = `./tag_settings/${from.replace(/[^0-9]/g, "")}.json`;
    if (fs.existsSync(settingsFile)) {
      const { enabled } = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
      if (!enabled) return;
    }

    const mentionedNums = mentions.map(j => getBareNumber(j));
    const botNum = getBareNumber(sock.user?.id);
    const botLidNum = getBareNumber(sock.user?.lid);
    const ownerNum = global.owners?.[0] || null;

    if (mentionedNums.includes(botNum) || mentionedNums.includes(botLidNum) || mentionedNums.includes(ownerNum)) {
      const soundFile = `./tag_sounds/${from.replace(/[^0-9]/g, "")}.mp3`;
      if (fs.existsSync(soundFile)) {
        const buffer = fs.readFileSync(soundFile);
        await sock.sendMessage(from, { audio: buffer, mimetype: "audio/mp4", ptt: true });
      }
    }
  });
}

// =======================
// LANCEMENT DU BOT
startPairing();