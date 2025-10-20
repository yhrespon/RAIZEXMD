// kicksticker.js
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import fs from "fs";
import path from "path";

const SETTINGS_DIR = "./kicksticker_settings";
if (!fs.existsSync(SETTINGS_DIR)) fs.mkdirSync(SETTINGS_DIR, { recursive: true });

// Unwrap complet pour LID
function unwrapMessage(m) {
  if (!m) return null;
  if (m.ephemeralMessage) return unwrapMessage(m.ephemeralMessage.message);
  if (m.viewOnceMessageV2) return unwrapMessage(m.viewOnceMessageV2.message);
  if (m.viewOnceMessageV2Extension) return unwrapMessage(m.viewOnceMessageV2Extension.message);
  if (m.documentWithCaptionMessage) return unwrapMessage(m.documentWithCaptionMessage.message);
  return m;
}

// KickSticker Commands
export const kickstickerCommands = [
  {
    name: "kicksticker",
    async execute(sock, msg, args, from) {
      const sender = getBareNumber(msg.key.fromMe ? sock.user.id : msg.key.participant || from);
      if (!global.owners.includes(sender)) return;

      const action = args[0]?.toLowerCase();
      if (!["on", "off"].includes(action)) return;

      const settingsFile = path.join(SETTINGS_DIR, `${from.replace(/[^0-9]/g, "")}.json`);
      let settings = {};
      if (fs.existsSync(settingsFile)) settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));

      settings.enabled = action === "on";
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
      await sendRichReply(sock, from, msg, [msg.key.participant], `✅ KickSticker est maintenant : ${action.toUpperCase()}`);
    }
  },

  {
    name: "savesticker",
    async execute(sock, msg) {
      const sender = getBareNumber(msg.key.fromMe ? sock.user.id : msg.key.participant);
      if (!global.owners.includes(sender)) return;

      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted?.stickerMessage) return;

      const settingsFile = path.join(SETTINGS_DIR, `${msg.key.remoteJid.replace(/[^0-9]/g, "")}.json`);
      let settings = {};
      if (fs.existsSync(settingsFile)) settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));

      settings.stickerId = quoted.stickerMessage?.fileSha256 ? Buffer.from(quoted.stickerMessage.fileSha256).toString("hex") : null;
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
      await sendRichReply(sock, msg.key.remoteJid, msg, [msg.key.participant], "✅ Sticker KickSticker sauvegardé !");
    }
  },

  {
    name: "kicksticker_listener",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      if (!from.endsWith("@g.us")) return;

      const settingsFile = path.join(SETTINGS_DIR, `${from.replace(/[^0-9]/g, "")}.json`);
      if (!fs.existsSync(settingsFile)) return;

      const { enabled, stickerId } = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
      if (!enabled) return;

      const inner = unwrapMessage(msg.message);
      if (!inner?.stickerMessage) return;

      const msgStickerId = inner.stickerMessage.fileSha256 ? Buffer.from(inner.stickerMessage.fileSha256).toString("hex") : null;
      if (!msgStickerId || msgStickerId !== stickerId) return;

      const senderId = msg.key.fromMe ? sock.user.id : (msg.key.participant || msg.key.remoteJid);
      if (!(senderId === sock.user.id || senderId === sock.user.lid)) return;

      const quotedJid = inner?.extendedTextMessage?.contextInfo?.participant;
      if (!quotedJid) return;

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const botJid = sock.user.id;
        const botParticipant = groupMetadata.participants.find(p => p.id === botJid);
        if (!botParticipant?.admin) return;

        const target = groupMetadata.participants.find(p => p.id === quotedJid);
        if (!target) return;

        if (!target.admin) {
          await sock.groupParticipantsUpdate(from, [quotedJid], "remove");
        }
      } catch (err) {
        console.error("[KickSticker] Erreur :", err);
      }
    }
  }
];

export default kickstickerCommands;