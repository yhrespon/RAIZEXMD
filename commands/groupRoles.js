// commands/groupRoles.js
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import fs from "fs";

// Charger sudo depuis fichier
const SUDO_FILE = "./sudo.json";
function loadSudo() {
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

// Vérifier si un utilisateur est owner/sudo
function isAllowed(senderNum) {
  const allowedUsers = [
    ...(global.owners || []),
    ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))
  ];
  return allowedUsers.includes(senderNum);
}

// Vérifier si un utilisateur est protégé (bot, owner, sudo)
function isProtectedUser(id, botJid) {
  const protectedIds = [
    botJid,
    ...(global.owners || []).map(n => n + "@s.whatsapp.net"),
    ...loadSudo().map(n => n + "@s.whatsapp.net")
  ];
  return protectedIds.includes(id);
}

export const groupRolesCommands = [
  {
    name: "demote",
    description: "Rétrograder un ou plusieurs admins mentionnés",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));
      const sender = msg.pushName || senderNum;

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      try {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedUser = msg.message?.extendedTextMessage?.contextInfo?.participant;
        let targets = [...mentioned];
        if (quotedUser && !targets.includes(quotedUser)) targets.push(quotedUser);

        if (targets.length === 0) {
          return await sendErrorReply(sock, from, msg, sender, "❌ Mentionne ou répond au message de la personne à rétrograder.");
        }

        await sock.groupParticipantsUpdate(from, targets, "demote");
        await sock.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

        const teks = `✅ ${targets.map(t => `@${t.split("@")[0]}`).join(", ")} n’est plus admin.`;
        await sendRichReply(sock, from, msg, targets, teks);

      } catch (err) {
        console.error("❌ Erreur demote :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de rétrograder l’utilisateur. Vérifie les permissions.");
      }
    }
  },
  {
    name: "promote",
    description: "Promouvoir un ou plusieurs membres mentionnés",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));
      const sender = msg.pushName || senderNum;

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      try {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedUser = msg.message?.extendedTextMessage?.contextInfo?.participant;
        let targets = [...mentioned];
        if (quotedUser && !targets.includes(quotedUser)) targets.push(quotedUser);

        if (targets.length === 0) {
          return await sendErrorReply(sock, from, msg, sender, "❌ Mentionne ou répond au message de la personne à promouvoir.");
        }

        await sock.groupParticipantsUpdate(from, targets, "promote");
        await sock.sendMessage(from, { react: { text: "⬆️", key: msg.key } });

        const teks = `✅ ${targets.map(t => `@${t.split("@")[0]}`).join(", ")} est maintenant admin.`;
        await sendRichReply(sock, from, msg, targets, teks);

      } catch (err) {
        console.error("❌ Erreur promote :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de promouvoir l’utilisateur. Vérifie les permissions.");
      }
    }
  },

  {
    name: "promoteall",
    description: "Promouvoir tous les membres (sans exception)",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));
      const sender = msg.pushName || senderNum;

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      if (!from.endsWith("@g.us")) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Commande réservée aux groupes.");
      }

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants || [];

        const toPromote = participants.filter(p => !p.admin).map(p => p.id);

        if (toPromote.length === 0) {
          return await sendRichReply(sock, from, msg, [], "✅ Tous les membres sont déjà administrateurs.");
        }

        await sock.groupParticipantsUpdate(from, toPromote, "promote");
        await sock.sendMessage(from, { react: { text: "🔼", key: msg.key } });

        const teks = `🔼 ${toPromote.length} membre(s) promu(s) admin.`;
        await sendRichReply(sock, from, msg, toPromote, teks);

      } catch (err) {
        console.error("❌ Erreur promoteall :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible d’exécuter promoteall.");
      }
    }
  }
];

export default groupRolesCommands;