// commands/groupManagement.js
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import fs from "fs";

// === Vérif Owner / Sudo ===
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

export const groupManagementCommands = [
  {
    name: "kick",
    description: "Expulse un ou plusieurs membres mentionnés ou en reply",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "🚫 Commande réservée aux owners/sudo.");
      }

      try {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedUser = msg.message?.extendedTextMessage?.contextInfo?.participant;

        let targets = [...mentioned];
        if (quotedUser && !targets.includes(quotedUser)) targets.push(quotedUser);

        if (targets.length === 0) {
          return await sendErrorReply(sock, from, msg, sender, "⚠️ Mentionne ou répond au message de la personne à expulser.");
        }

        await sock.groupParticipantsUpdate(from, targets, "remove");
        await sock.sendMessage(from, { react: { text: "👋", key: msg.key } });

        const teks = `✅ ${targets.map(t => `@${t.split("@")[0]}`).join(", ")} expulsé(s) avec succès.`;
        await sendRichReply(sock, from, msg, targets, teks);
      } catch (err) {
        console.error("❌ Erreur kick :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible d’expulser ces membres. Vérifie mes permissions.");
      }
    }
  },
  {
    name: "add",
    description: "Ajouter un membre via numéro (ex: 2376XXXXXXX)",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "🚫 Commande réservée aux owners/sudo.");
      }
      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "❌ Commande réservée aux groupes.");
      if (!args[0]) return await sendErrorReply(sock, from, msg, sender, "❌ Fournis un numéro à ajouter.");

      try {
        const number = args[0].replace(/[^0-9]/g, "");
        const jid = number + "@s.whatsapp.net";

        await sock.groupParticipantsUpdate(from, [jid], "add");
        await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

        const teks = `✅ @${number} ajouté au groupe.`;
        await sendRichReply(sock, from, msg, [jid], teks);
      } catch (err) {
        console.error("❌ Erreur add :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible d’ajouter ce membre.");
      }
    }
  },
  {
    name: "mute",
    description: "Mute tous les membres du groupe sauf le bot",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "🚫 Commande réservée aux owners/sudo.");
      }
      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "❌ Commande réservée aux groupes.");

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants || [];
        const botJid = (sock?.user?.id || sock?.user?.jid || "").split?.(":")?.[0] || "";

        const toMute = participants.filter(p => p.id !== botJid).map(p => p.id);
        if (toMute.length === 0) return await sendErrorReply(sock, from, msg, sender, "✅ Aucun membre à mute.");

        await sock.groupSettingUpdate(from, "announcement");
        await sock.sendMessage(from, { react: { text: "🔇", key: msg.key } });

        const teks = `🔇 Tous les membres ont été mutés.`;
        await sendRichReply(sock, from, msg, toMute, teks);
      } catch (err) {
        console.error("❌ Erreur mute :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de mute les membres. Vérifie mes permissions.");
      }
    }
  },
  {
    name: "unmute",
    description: "Démute tous les membres du groupe",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "🚫 Commande réservée aux owners/sudo.");
      }
      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "❌ Commande réservée aux groupes.");

      try {
        await sock.groupSettingUpdate(from, "not_announcement");
        await sock.sendMessage(from, { react: { text: "🔊", key: msg.key } });

        const teks = `🔊 Tous les membres peuvent de nouveau envoyer des messages.`;
        await sendRichReply(sock, from, msg, [sender], teks);
      } catch (err) {
        console.error("❌ Erreur unmute :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de démute les membres.");
      }
    }
  },
  {
    name: "link",
    description: "Récupère le lien d'invitation du groupe",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "🚫 Commande réservée aux owners/sudo.");
      }
      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "❌ Commande réservée aux groupes.");

      try {
        const groupInviteCode = await sock.groupInviteCode(from);
        const inviteLink = `https://chat.whatsapp.com/${groupInviteCode}`;

        await sock.sendMessage(from, { react: { text: "🔗", key: msg.key } });
        const teks = `🔗 Lien d'invitation du groupe :\n${inviteLink}`;
        await sendRichReply(sock, from, msg, [sender], teks);
      } catch (err) {
        console.error("❌ Erreur link :", err);
        await sendErrorReply(sock, from, msg, sender, "⚠️ Impossible de récupérer le lien du groupe.");
      }
    }
  }
];

export default groupManagementCommands;