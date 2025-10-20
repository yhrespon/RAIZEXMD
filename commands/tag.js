import fs from "fs";
import path from "path";
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const tagCommands = [
 {
  name: "tagall",
  description: "Taguer tous les membres d’un groupe",
  async execute(sock, msg) {
    const from = msg.key.remoteJid;
    const sender = msg.pushName || msg.key.participant;

    // Vérifier si c'est un groupe
    if (!from.endsWith("@g.us")) {
      return await sock.sendMessage(from, {
        text: "⚠️ Commande réservée aux groupes.",
        quoted: msg
      });
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants;

      const mentions = participants.map(p => p.id);
      const textMentions = participants
        .map(p => `@${p.id.split("@")[0]}`)
        .join("\n");

      const signature = "✨ 𝑷𝒂𝒔 𝒃𝒆𝒔𝒐𝒊𝒏 𝒅𝒆 𝒍𝒊𝒌𝒆, 𝒋𝒆 𝒔𝒂𝒊𝒔 𝒅𝒆́𝒋𝒂̀ 𝒒𝒖𝒆 𝒋𝒆 𝒔𝒖𝒊𝒔 𝒍𝒂 𝒏𝒐𝒕𝒊𝒇 𝒍𝒂 𝒑𝒍𝒖𝒔 𝒊𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕𝒆\n👑 𝐃𝐄𝐕-𝐑𝐀𝐈𝐙𝐄𝐋";

      // Envoi de l'image avec la signature au-dessus des mentions
      await sock.sendMessage(from, {
        image: { url: "https://files.catbox.moe/aanan8.jpg" },
        caption: signature + "\n\n📢 TAGALL\n\n" + textMentions,
        mentions
      });

    } catch (err) {
      console.error("❌ Erreur tagall :", err);
      await sock.sendMessage(from, {
        text: "❌ Impossible de taguer tous les membres.",
        quoted: msg
      });
    }
  }
},    
 {
    name: "tagcreator",
    description: "Taguer le créateur principal du groupe",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "⚠️ Commande réservée aux groupes.");

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const creatorId = groupMetadata.owner;
        if (!creatorId) return await sendErrorReply(sock, from, msg, sender, "❌ Impossible de trouver le créateur du groupe.");

        const text = `👑 Le créateur principal du groupe est : @${creatorId.split("@")[0]}`;
        await sendRichReply(sock, from, msg, [creatorId], text);
        await sock.sendMessage(from, { react: { text: "👑", key: msg.key } });

      } catch (err) {
        console.error("❌ Erreur tagcreator :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Une erreur est survenue lors de l'exécution de la commande.");
      }
    }
  },
  {
    name: "tagadmin",
    description: "Taguer tous les admins du groupe",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!from.endsWith("@g.us")) return await sendErrorReply(sock, from, msg, sender, "⚠️ Commande réservée aux groupes.");

      try {
        const groupMetadata = await sock.groupMetadata(from);
        const admins = groupMetadata.participants.filter(p => p.admin);
        if (!admins.length) return await sendErrorReply(sock, from, msg, sender, "⚠️ Aucun admin trouvé.");

        const mentions = admins.map(a => a.id);
        const textMentions = admins.map(a => `@${a.id.split("@")[0]}`).join("\n");
        const text = `📢 TAGADMIN_\n\n${textMentions}`;

        await sendRichReply(sock, from, msg, mentions, text, { url: "https://files.catbox.moe/aanan8.jpg" });
        await sock.sendMessage(from, { react: { text: "👑", key: msg.key } });

      } catch (err) {
        console.error("❌ Erreur tagadmin :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de taguer les admins.");
      }
    }
  },
 {
 name: "tag",
  aliases: [],
  description: "Tag tous les membres avec ou sans message cité",
  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const sender = msg.pushName || getBareNumber(msg.key.participant);

    if (!from.endsWith("@g.us")) return; // Seulement en groupe

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const mentions = groupMetadata.participants.map(p => p.id);
      const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      let messageToSend;

      // Si un message est cité
      if (quotedMsg) {
        messageToSend =
          quotedMsg.conversation ||
          quotedMsg.extendedTextMessage?.text ||
          quotedMsg.imageMessage?.caption ||
          quotedMsg.videoMessage?.caption ||
          quotedMsg.documentMessage?.fileName;
      }

      // Si un texte est fourni avec la commande
      if (!messageToSend && args.length) {
        messageToSend = args.join(" ");
      }

      // Si rien n’est donné, tag simple
      await sock.sendMessage(from, { text: messageToSend || "", mentions });
      await sock.sendMessage(from, { react: { text: "🦅", key: msg.key } });

    } catch (err) {
      console.error("Erreur tag :", err);
    }
  }
},
  {
    name: "settag",
    description: "Définir un message audio automatique pour le tag",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const audioMsg = quoted?.audioMessage;

      if (!audioMsg) {
        await sendErrorReply(sock, from, msg, sender, "🎙️ Réponds à un message audio pour le définir comme réponse automatique au tag.");
        return;
      }

      try {
        const dir = "./tag_sounds";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const filename = `${from.replace(/[^0-9]/g, "")}.mp3`;
        const filepath = path.join(dir, filename);

        const buffer = await downloadMediaMessage(
          { message: quoted },
          "buffer",
          {},
          { reuploadRequest: sock.updateMediaMessage }
        );
        fs.writeFileSync(filepath, buffer);

        await sendRichReply(sock, from, msg, [msg.key.participant], "✅ Son de tag enregistré avec succès pour ce groupe !");
        await sock.sendMessage(from, { react: { text: "🎵", key: msg.key } });

      } catch (err) {
        console.error("❌ Erreur settag :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de télécharger le message audio.");
      }
    }
  },
{
  name: "repons",
  description: "Activer ou désactiver la réponse automatique au tag pour tous les groupes",
  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const sender = msg.pushName || getBareNumber(msg.key.participant);
    const dir = "./tag_settings";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = path.join(dir, `global.json`);
    const option = args[0]?.toLowerCase();

    if (!option || !["on", "off"].includes(option)) {
      await sendErrorReply(
        sock,
        from,
        msg,
        sender,
        "⚙️ Utilisation : *.repons on* pour activer, *.repons off* pour désactiver la réponse automatique globale."
      );
      return;
    }

    const settings = { enabled: option === "on" };
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

    await sendRichReply(
      sock,
      from,
      msg,
      [msg.key.participant],
      option === "on"
        ? "✅ Réponse automatique au tag activée pour tous les groupes."
        : "🚫 Réponse automatique au tag désactivée pour tous les groupes."
    );

    await sock.sendMessage(from, { react: { text: "⚙️", key: msg.key } });
  }
}
];

export default tagCommands;