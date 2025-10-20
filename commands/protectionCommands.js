// ✅ commands/protectionCommands.js — version sécurisée RAIZEL
import { statusProtections } from "../protections.js";
import { readJSON, writeJSON } from "../lib/dataManager.js";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import fs from "fs";
import { jidDecode } from "@whiskeysockets/baileys";

const FILE = "protections.json";

// =================== EMOJIS ===================
const emojis = {
  antiLink: "🔗",
  antiPromote: "👑",
  antiDemote: "🚫",
  antiBot: "🤖",
  antiCall: "📞",
  antiSpam: "⚠️",
  antiKick: "👢"
};

// =================== PROTECTIONS ===================
const protections = [
  "antiLink",
  "antiPromote",
  "antiDemote",
  "antiBot",
  "antiCall",
  "antiSpam",
  "antiKick"
];

// =================== GESTION OWNERS/SUDO ===================
const SUDO_FILE = "./sudo.json";

function loadSudo() {
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

function isAllowed(senderNum) {
  const allowedUsers = [
    ...(global.owners || []),
    ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))
  ];
  return allowedUsers.includes(senderNum);
}

// =================== SECURE JID DECODER ===================
function safeDecodeJidLocal(jid) {
  if (!jid) return "";
  try {
    const decoded = jidDecode(jid);
    return decoded?.user || jid.split("@")[0] || "";
  } catch {
    return jid.split("@")[0] || "";
  }
}

// =================== TOGGLE PROTECTION ===================
function toggleProtection(key, value) {
  if (typeof statusProtections[key] !== "boolean") return false;
  statusProtections[key] = value;

  let data = readJSON(FILE) || {};
  data[key] = value;
  writeJSON(FILE, data);

  return true;
}

// =================== EXPORT COMMANDES ===================
export default protections.map((key) => ({
  name: key.toLowerCase(),
  aliases: [key.toLowerCase()],
  execute: async (sock, msg, args, from) => {
    try {
      const jid =
        msg.key.fromMe
          ? (sock?.user?.id || "")
          : (msg.key.participant || msg.key.remoteJid || from || "");

      const senderNum = getBareNumber(jid);

      // 🔹 Utilisation du decode sûr depuis sock ou fallback
      const sender = (sock?.decodeJid ? sock.decodeJid(jid) : safeDecodeJidLocal(jid)) || senderNum;

      // Vérif owner/sudo
      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      // Vérifie argument on/off
      if (!args[0] || !["on", "off"].includes(args[0].toLowerCase())) {
        return await sendErrorReply(
          sock,
          from,
          msg,
          sender,
          `${emojis[key]} ${key} est actuellement ${statusProtections[key] ? "activé" : "désactivé"}\nUsage : .${key.toLowerCase()} <on/off>`
        );
      }

      const opt = args[0].toLowerCase();
      toggleProtection(key, opt === "on");

      // Message de confirmation
      await sendRichReply(
        sock,
        from,
        msg,
        [msg.key.participant],
        `${emojis[key]} ${key} ${opt === "on" ? "activé" : "désactivé"} pour ce groupe !`
      );

      // Réaction
      await sock.sendMessage(from, { react: { text: emojis[key], key: msg.key } });
    } catch (err) {
      console.error(`Erreur commande ${key}:`, err);
      await sendErrorReply(sock, from, msg, "Système", `❌ Erreur interne: ${err.message}`);
    }
  }
}));