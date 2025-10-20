// commands/groupMass.js

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

const groupMassCommands = [
  // ========== COMMANDE KICKALL ==========
  {
    name: "kickall",
    description: "Expulse tous les membres non-admins (sauf bot)",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));
      const sender = msg.pushName || senderNum;

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants || [];

        const botId = sock.user?.id || sock.user?.jid || sock.user?.me?.id || "";
        const admins = participants.filter(p => p.admin).map(p => p.id);
        const members = participants
          .map(p => p.id)
          .filter(id => !admins.includes(id) && id !== botId);

        if (members.length === 0) {
          return await sendRichReply(sock, from, msg, [], "Aucun membre non-admin à expulser.");
        }

        await sock.sendMessage(from, { text: `Expulsion en cours : ${members.length} membre(s) seront retiré(s).` });

        const chunkSize = 5;
        for (let i = 0; i < members.length; i += chunkSize) {
          const chunk = members.slice(i, i + chunkSize);
          try {
            await sock.groupParticipantsUpdate(from, chunk, "remove");
          } catch (e) {
            console.error("Erreur d'expulsion :", e);
            await sendErrorReply(sock, from, msg, sender, "Erreur lors de l'expulsion de certains membres.");
          }
          await new Promise(res => setTimeout(res, 3000));
        }

        await sendRichReply(sock, from, msg, members, `Opération terminée. ${members.length} membres expulsés.`);

      } catch (err) {
        console.error("Erreur kickall :", err);
        await sendErrorReply(sock, from, msg, sender, "Une erreur est survenue lors du kickall.");
      }
    }
  },

  // ========== COMMANDE PURGE ==========
  {
    name: "purge",
    description: "Expulse tous les membres non-admins sauf bot et owner",
    async execute(sock, msg, args) {
      const from = msg?.key?.remoteJid;
      const senderNum = getBareNumber(msg.key.fromMe ? sock.user.id : (msg.key.participant || from));
      const sender = msg.pushName || senderNum;

      if (!isAllowed(senderNum)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Cette commande est réservée aux owners/sudo.");
      }

      const ownerNumber = (process.env.OWNER_NUMBER || "").replace(/[^0-9]/g, "") + "@s.whatsapp.net";

      if (!from || !from.endsWith("@g.us")) {
        return await sendErrorReply(sock, from || msg.key.remoteJid, msg, sender, "Commande utilisable uniquement dans un groupe.");
      }

      try {
        const groupData = await sock.groupMetadata(from);
        const participants = groupData.participants || [];
        const botJid = (sock?.user?.id || sock?.user?.jid || "").split?.(":")?.[0] || "";

        const toKick = participants
          .filter(p => !p.admin && p.id !== ownerNumber && p.id !== botJid)
          .map(p => p.id);

        if (toKick.length === 0) {
          return await sendRichReply(sock, from, msg, [], "Aucun membre à expulser.");
        }

        await sock.sendMessage(from, { text: `Début de la purge : ${toKick.length} membres seront expulsés.` });
        await sock.groupParticipantsUpdate(from, toKick, "remove");
        await sendRichReply(sock, from, msg, toKick, `Purge terminée : ${toKick.length} membres expulsés.\nAdmins, owner et bot intacts.`);

      } catch (err) {
        console.error("Erreur purge :", err);
        await sendErrorReply(sock, from, msg, sender, "Erreur lors de l'exécution de la purge.");
      }
    }
  },

  // ========== COMMANDE DLT ==========
  {
    name: "dlt",
    description: "Supprime le message auquel vous répondez",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!msg.message?.extendedTextMessage?.contextInfo?.stanzaId) {
        return await sendErrorReply(
          sock,
          from,
          msg,
          sender,
          "⚠️ Réponds au message que tu veux supprimer."
        );
      }

      try {
        await sock.sendMessage(from, {
          delete: {
            remoteJid: from,
            fromMe: false,
            id: msg.message.extendedTextMessage.contextInfo.stanzaId,
            participant: msg.message.extendedTextMessage.contextInfo.participant
          }
        });

        await sendRichReply(
          sock,
          from,
          msg,
          [msg.message.extendedTextMessage.contextInfo.participant],
          "✅ Message supprimé."
        );

      } catch (err) {
        console.error("❌ Erreur delete :", err);
        await sendErrorReply(
          sock,
          from,
          msg,
          sender,
          "❌ Impossible de supprimer le message."
        );
      }
    }
  }
];

export default groupMassCommands;