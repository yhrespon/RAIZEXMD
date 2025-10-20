import fs from "fs";
import path from "path";
import axios from "axios";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const groupinfoCommands = [
  // 📝 DESCRIPTION DU GROUPE
  {
    name: "desc",
    aliases: ["description", "gdesc"],
    emoji: "📝",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!from.endsWith("@g.us")) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Cette commande doit être utilisée dans un groupe.");
      }

      try {
        const metadata = await sock.groupMetadata(from);
        const desc = metadata.desc || "📭 Aucune description définie.";
        const groupName = metadata.subject || "Groupe sans nom";

        const text = `> _Informations du groupe_\n\n👥 *Nom :* ${groupName}\n📝 *Description :*\n${desc}`;

        await sendRichReply(sock, from, msg, [msg.key.participant], text);
        await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });
      } catch (e) {
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur : " + e.message);
      }
    },
  },

  // 🖼️ PHOTO DE PROFIL DU GROUPE
  {
    name: "gpp",
    aliases: ["grouppp", "groupicon", "groupavatar"],
    emoji: "🖼️",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!from.endsWith("@g.us")) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Utilisable uniquement dans un groupe !");
      }

      try {
        let ppUrl;
        try {
          ppUrl = await sock.profilePictureUrl(from, "image");
        } catch {
          ppUrl = "https://files.catbox.moe/2yz2qu.jpg";
        }

        const metadata = await sock.groupMetadata(from);
        const caption = `🖼️ *Photo de profil du groupe*\n👥 *Nom :* ${metadata.subject}`;

        await sock.sendMessage(
          from,
          { image: { url: ppUrl }, caption, mentions: [msg.key.participant] },
          { quoted: msg }
        );
        await sock.sendMessage(from, { react: { text: "🖼️", key: msg.key } });
      } catch (e) {
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur GPP : " + e.message);
      }
    },
  },

  // 👤 PHOTO DE PROFIL UTILISATEUR
  {
    name: "pp",
    aliases: ["profile", "avatar"],
    emoji: "👤",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      try {
        // Détection de la cible : reply, mention ou argument
        const target =
          msg.quoted?.key?.participant ||
          msg.message?.extendedTextMessage?.contextInfo?.participant ||
          msg.mentionedJid?.[0] ||
          (args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : msg.key.participant);

        let ppUrl;
        try {
          ppUrl = await sock.profilePictureUrl(target, "image");
        } catch {
          ppUrl = "https://files.catbox.moe/2yz2qu.jpg";
        }

        const userName = (await sock.onWhatsApp(target))?.[0]?.notify || target.split("@")[0];

        const caption = `👤 *Profil de ${userName}*\n\n> _Affiché via la commande profil_`;

        await sock.sendMessage(
          from,
          { image: { url: ppUrl }, caption, mentions: [target] },
          { quoted: msg }
        );
        await sock.sendMessage(from, { react: { text: "👤", key: msg.key } });
      } catch (e) {
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur PP : " + e.message);
      }
    },
  },

  // 🤖 COMMANDE IA
  {
    name: "ia",
    aliases: ["ai", "hades"],
    emoji: "🤖",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const question = args.join(" ");

      if (!question) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Pose une question à l’IA.\nExemple : *.ia qui est Zeus ?*");
      }

      try {
        await sendRichReply(sock, from, msg, [msg.key.participant], "🤔 _Raizel réfléchit..._");

        const apiUrl = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(question)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.success || !data.result) {
          throw new Error("Aucune réponse obtenue des abysses...");
        }

        const replyText = `> _Réponse d'Hadès :_\n\n${data.result}`;

        await sendRichReply(sock, from, msg, [msg.key.participant], replyText);
        await sock.sendMessage(from, { react: { text: "🤖", key: msg.key } });
      } catch (err) {
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur IA : " + err.message);
      }
    },
  },
];

export default groupinfoCommands;