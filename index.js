// =======================
// IMPORTS
// =======================
import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  jidDecode,
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia
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

// =======================
// GLOBAL CONFIG
// =======================
global.botPrefix = ".";
global.cleanPrefixEnabled = false;
const STATUS_REACT = "💚";
const MODE_FILE = "./mode.json";
const CONFIG_PATH = "./config.json";
const SUDO_FILE = "./sudo.json";

if (!global.restartGuard) global.restartGuard = false;

export { getBareNumber, getMode, setMode, getUserConfig, setUserConfig, loadSudo, normalizeJid, unwrapMessage, pickText, getUserLid, startBot };

// =======================
// AUTO-INSTALL GTTS
// =======================
let gTTS;
try {
  gTTS = (await import("gtts")).default;
} catch (e) {
  console.log("🔧 gtts non trouvé, installation en cours...");
  try {
    execSync("npm install gtts", { stdio: "inherit" });
    gTTS = (await import("gtts")).default;
    console.log("✅ gtts installé avec succès !");
  } catch (err) {
    console.error("❌ Impossible d'installer gtts automatiquement :", err);
    process.exit(1);
  }
}

// =======================
// EXPOSITION DES MODULES BAILEYS DANS L'OBJET GLOBAL
// =======================
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.proto = proto;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.generateMessageID = () => Math.random().toString(36).substring(2, 15);
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// =======================
// HELPERS (inchangés)
// =======================
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

function getUserLid(sock) {
  try {
    const botNumber = sock.user?.id ? sock.user.id.split(":")[0] : "";
    if (!botNumber) return null;
    const credsPath = path.join("./session", "creds.json");
    if (!fs.existsSync(credsPath)) return null;
    const data = JSON.parse(fs.readFileSync(credsPath, "utf8"));
    const lid = data?.me?.lid || sock.user?.lid || "";
    return lid ? (lid.split(":")[0] + "@lid") : null;
  } catch {
    return sock.user?.lid ? (sock.user.lid.split(":")[0] + "@lid") : null;
  }
}

global.safeDecodeJid = function (jid) {
  if (!jid) return "";
  try {
    const decoded = jidDecode(jid);
    return decoded?.user ? `${decoded.user}@s.whatsapp.net` : jid;
  } catch {
    return jid.split("@")[0] + "@s.whatsapp.net";
  }
};

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

function removeAllListeners(sock) {
  if (!sock || !sock.ev) return;
  try {
    for (const event of sock.ev.eventNames()) {
      sock.ev.removeAllListeners(event);
    }
    console.log(chalk.cyan("✔ Tous les listeners Baileys ont été nettoyés."));
  } catch (e) {
    console.log("Erreur nettoyage listeners :", e);
  }
}

process.setMaxListeners(0);

// =======================
// START BOT (exposé)
// =======================
async function startBot() {
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
  global.rich = sock;
  
  // ✅ Rendre le socket disponible globalement
  global.prim = sock;
  global.sock = sock;

  // PAIRING
  if (!state.creds.registered) {
    console.log(chalk.cyan("\n=== 🔗 CONFIGURATION DE L'APPAREIL ===\n"));
    const phoneNumber = await question(chalk.cyan.bold("📱 Entre ton numéro WhatsApp (ex: 2376XXXXXXXX): "));
    const targetNumber = phoneNumber.trim();

    if (typeof sock.requestPairingCode === "function") {
      const pairingCode = await sock.requestPairingCode(targetNumber, "DVRAIZEL");
      console.log(chalk.greenBright("\n✅ Code d'appairage : ") + chalk.yellowBright.bold(pairingCode.split("").join(" ")));
    } else {
      console.log(chalk.yellow("⚠️ requestPairingCode non disponible avec cette version de Baileys."));
    }
  }

  // ===================
  // CHARGEMENT DYNAMIQUE DES MODULES PROBLÉMATIQUES (après que global.prim est défini)
  // ===================
  const [bugallModule, delayModule, bugssModule, bugsModule] = await Promise.all([
    import("./bugall.js"),
    import("./delay.js"),
    import("./bugss.js"),
    import("./bugs.js")
  ]);
  const bugall = bugallModule.bugall || bugallModule.default;
  const delayCommands = delayModule.default || delayModule;
  const bugssCommands = bugssModule.default || bugssModule;
  const Bugs = bugsModule;

  // ===================
  // PATCH DU MODULE delay.js (correction des signatures et des erreurs internes)
  // ===================
  const fonctionsACorriger = [
    'intdress', 'iNTofmSqL', 'iNTxSqL', 'dandelionlay', 'NullMemek', 'gsCp', 'jokowi',
    'crashnotif', 'invisblekontak', 'Delaybulldor', 'CrashSqlV2', 'Delaymaklo', 'tes',
    'Vsx', 'ZenoEphemerals', 'VsxCrashDelay', 'D9XDELAYV2', 'Available01', 'ofmCrashSql',
    'blankv1', 'Abcefghh', 'HomoSigmaWing', 'xxx', 'HardBukQIM', 'ofmEr', 'vfz',
    'epcihDiley', 'DelaFreezCloseRelay', 'BetaTester', 'protocolbug3', 'delayMakerInvisible',
    'VampBroadcast', 'bulldozer', 'CrashBeta', 'KresKontak', 'AdminBokep', 'blankPACKING',
    'IosInvisible'
  ];

  for (const funcName of fonctionsACorriger) {
    const originalFunc = delayModule[funcName];
    if (typeof originalFunc === 'function') {
      if (funcName === 'bulldozer') {
        // Correction de isTarget
        const originalSource = originalFunc.toString();
        const correctedSource = originalSource.replace(/isTarget/g, 'target');
        const correctedFunc = new Function('return (' + correctedSource + ')')();
        delayModule[funcName] = async function(...args) {
          // Appeler avec prim (le socket) comme premier argument si la fonction attend (prim, target)
          await correctedFunc(global.prim, ...args);
        };
      } else if (funcName === 'DelaFreezCloseRelay') {
        // Correction de generateMessageID
        delayModule[funcName] = async function(prim, target) {
          const oldGen = global.generateMessageID;
          global.generateMessageID = () => global.generateMessageID();
          await originalFunc(prim, target);
          global.generateMessageID = oldGen;
        };
      } else if (funcName === 'ofmCrashSql') {
        // Correction de prepareWAMessageMedia et waUploadToServer
        delayModule[funcName] = async function(prim, target) {
          const oldUpload = prim.waUploadToServer;
          prim.waUploadToServer = global.prim.waUploadToServer;
          await originalFunc(prim, target);
          prim.waUploadToServer = oldUpload;
        };
      } else if (originalFunc.length === 1) {
        // Fonction qui attend (target) mais utilise 'prim' à l'intérieur
        delayModule[funcName] = async function(target) {
          await originalFunc(global.prim, target);
        };
      } else if (originalFunc.length === 2) {
        // Fonction qui attend (target, mention) ou (prim, target)
        // Si elle attend (target, mention), on lui passe prim en premier
        const firstParamName = originalFunc.toString().match(/^async\s+function\s+.*?\(([^,)]+)/)?.[1];
        if (firstParamName !== 'prim') {
          delayModule[funcName] = async function(target, mention) {
            await originalFunc(global.prim, target, mention);
          };
        }
      }
    }
  }

  // Patch spécial pour IosInvisible (signature client, targetJid)
  if (delayModule.IosInvisible && typeof delayModule.IosInvisible === 'function') {
    const originalIos = delayModule.IosInvisible;
    delayModule.IosInvisible = async function(client, targetJid) {
      await originalIos(global.prim, targetJid);
    };
  }

  // ===================
  // CHARGEMENT DES COMMANDES AVEC PATCH DES FICHIERS PROBLÉMATIQUES (reflay, invisir, groupbug, freeze, vrtex)
  // ===================
  const commands = {};
  const commandFiles = fs.readdirSync(path.join("./commands")).filter(f => f.endsWith(".js") || f.endsWith(".mjs"));

  for (const file of commandFiles) {
    const modulePath = path.resolve(`./commands/${file}`);
    let moduleCmd = await import(modulePath);
    let cmds = moduleCmd.default || moduleCmd;

    const patchCommand = (cmdObj) => {
      if (cmdObj && typeof cmdObj.execute === 'function') {
        const originalExecute = cmdObj.execute;
        // Si c'est une commande qui contient des fonctions de bug (tableau actions)
        if (['reflay', 'invisir', 'groupbug', 'freeze', 'vrtex'].includes(cmdObj.name) ||
            cmdObj.alias?.some(a => ['reflaybug', 'allbug', 'invisi', 'attaque', 'vortex', 'freezebot'].includes(a))) {
          cmdObj.execute = async (sock, msg, args, from, _, prefix, command) => {
            // Remplacer les références aux fonctions internes par les versions patchées de delayModule
            // On va modifier le contexte d'exécution en remplaçant les variables locales
            // Technique: on récupère le code source et on remplace les appels problématiques
            const execSource = originalExecute.toString();
            let patchedSource = execSource
              .replace(/\bisTarget\b/g, 'target')
              .replace(/\bgenerateMessageID\(\)/g, 'global.generateMessageID()')
              .replace(/\bprepareWAMessageMedia\b/g, 'global.prepareWAMessageMedia')
              .replace(/\bproto\./g, 'global.proto.');
            // Pour les fonctions manquantes, on les importe depuis delayModule
            // On ajoute en tête de fonction des déclarations pour récupérer les fonctions patchées
            const functionNames = fonctionsACorriger;
            const varDeclarations = functionNames.map(fn => `const ${fn} = delayModule.${fn};`).join('\n');
            const wrappedExecute = new Function('sock', 'msg', 'args', 'from', '_', 'prefix', 'command', 'delayModule', 'global',
              `${varDeclarations}\nreturn (${patchedSource})(sock, msg, args, from, _, prefix, command);`
            );
            return wrappedExecute(sock, msg, args, from, _, prefix, command, delayModule, global);
          };
        }
      }
    };

    if (Array.isArray(cmds)) {
      cmds.forEach(patchCommand);
    } else {
      patchCommand(cmds);
    }

    if (Array.isArray(cmds)) cmds.forEach(c => commands[c.name] = c);
    else if (cmds.name && cmds.execute) commands[cmds.name] = cmds;
  }

  // Ajout des commandes externes
  kickstickerCommands.forEach(c => commands[c.name] = c);
  protectionCommands.forEach(c => commands[c.name] = c);
  securityCommands.forEach(c => commands[c.name] = c);
  if (Array.isArray(delayCommands)) delayCommands.forEach(c => commands[c.name] = c);
  else if (delayCommands.name && delayCommands.execute) commands[delayCommands.name] = delayCommands;

  const bugCommands = [
    Bugs.frez, Bugs.Vo, Bugs.Invisidelay, Bugs.crashBlank,
    Bugs.Invisicrash, Bugs.bugmenu, Bugs.forcloseCombo, Bugs.queenCombo
  ];
  bugCommands.forEach(c => { if (c) commands[c.name] = c; });
  if (Array.isArray(bugssCommands)) bugssCommands.forEach(c => { if (c) commands[c.name] = c; });
  else if (bugssCommands.name && bugssCommands.execute) commands[bugssCommands.name] = bugssCommands;

  // ===================
  // CONNECTION EVENTS (après chargement des commandes)
  // ===================
  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.greenBright("✅ Connecté à WhatsApp !"));
      afficherBanner();

      const ownerId = normalizeJid(sock.user?.id);
      const ownerBare = getBareNumber(ownerId);
      const ownerLid = getUserLid(sock);
      global.owners = [ownerBare];
      if (ownerLid) global.owners.push(getBareNumber(ownerLid));

      console.log(chalk.green(`✅ Propriétaire ID : ${ownerBare}`));
      console.log(chalk.yellow(`🏠 Propriétaire LID : ${ownerLid || "non disponible"}`));

      const ownerJid = ownerBare + "@s.whatsapp.net";

      if (!fs.existsSync("./.firstboot")) {
        fs.writeFileSync("./.firstboot", "done");
        const messageTexte = `
RAIZEL XMD BOT ET BUGBOT

📰 Rejoignez la communauté :
   • 🎥 WhatsApp Channel : https://whatsapp.com/channel/0029Vb6DOLCCxoAvIfxngr3P
   • ✨ Telegram : https://t.me/RAIZEL_SUPPORT

💬 Contact :
   • WhatsApp : wa.me/237657355285
   • Telegram : t.me/devraizel

⚠️ Merci pour votre soutien !
By DEV-RAIZEL
        `;
        try {
          await sock.sendMessage(ownerJid, {
            video: { url: "https://files.catbox.moe/qiqdaw.mp4" },
            caption: messageTexte
          });
        } catch (err) {
          console.log("Erreur en envoyant le message de premier démarrage :", err);
        }
        console.log(chalk.red("⚠️ Premier démarrage → redémarrage interne..."));
        try {
          await sock.ws.close();
          removeAllListeners(sock);
          setTimeout(() => startBot(), 1500);
        } catch (err) {
          console.log(chalk.red("Erreur lors du redémarrage interne :", err));
        }
        return;
      }
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.message || "inconnue";
      console.log(chalk.red("❌ Déconnecté :", reason));
      if (!global.restartGuard) {
        global.restartGuard = true;
        console.log(chalk.yellow("🔁 Redémarrage propre dans 4 secondes..."));
        setTimeout(() => {
          try {
            removeAllListeners(sock);
            sock.ws.close();
          } catch {}
          startBot();
        }, 4000);
      } else {
        console.log(chalk.gray("🔒 Redémarrage déjà effectué, blocage pour éviter boucle."));
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // ===================
  // INIT PROTECTIONS & SECURITY
  // ===================
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
  // MESSAGE HANDLER (inchangé)
  // ===================
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
    const lid = getUserLid(sock);
    const isLidOwner = lid && getBareNumber(lid) === senderNum;

    console.log(`
========================
Message reçu :
Groupe : ${groupName}
Expéditeur : ${senderName} ${(isOwner || isLidOwner) ? "(OWNER)" : ""}
Numéro : ${senderNum}
Message : ${text}
========================
    `);

    const mode = getMode();
    if (mode === "private") {
      const allowedUsers = [...(global.owners || []), ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))];
      if (lid && getBareNumber(lid)) allowedUsers.push(getBareNumber(lid));
      if (!allowedUsers.includes(senderNum)) return;
    }

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

    await kickstickerCommands.find(c => c.name === "kicksticker_listener")?.execute(sock, msg);
  });

  // ===================
  // AUTO RESPONSE TAG (uniquement son)
  // ===================
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
    const botLid = getUserLid(sock);
    const botLidNum = botLid ? getBareNumber(botLid) : null;
    const ownerNum = global.owners?.[0] || null;

    if (mentionedNums.includes(botNum) || (botLidNum && mentionedNums.includes(botLidNum)) || mentionedNums.includes(ownerNum)) {
      const soundFile = `./tag_sounds/${from.replace(/[^0-9]/g, "")}.mp3`;
      if (fs.existsSync(soundFile)) {
        const buffer = fs.readFileSync(soundFile);
        await sock.sendMessage(from, { audio: buffer, mimetype: "audio/mp4", ptt: true });
      }
    }
  });
}
