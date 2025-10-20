import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const mediaCommands = [
  {
    name: "sticker",
    description: "Créer un sticker à partir d'une image ou vidéo",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      try {
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage || msg.message;
        const type = quoted.imageMessage ? "imageMessage" : quoted.videoMessage ? "videoMessage" : null;

        if (!type) {
          await sock.sendMessage(from, { text: "⚠️ Réponds ou envoie une image/vidéo pour créer un sticker." });
          return;
        }

        const stream = await downloadContentFromMessage(quoted[type], type.replace("Message", ""));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const sticker = new Sticker(buffer, {
          pack: "RAIZEL XMD",
          author: sender,
          type: StickerTypes.FULL,
          quality: 70,
        });

        // Réaction emoji après création du sticker
        await sock.sendMessage(from, { react: { text: "✨", key: msg.key } });

        // Envoi du sticker
        await sock.sendMessage(from, { sticker: await sticker.build() }, { quoted: msg });

      } catch (e) {
        console.error("❌ Erreur sticker :", e);
        await sock.sendMessage(from, { text: "❌ Erreur création sticker : " + e.message });
      }
    }
  },
  {
    name: "take",
    description: "Réattribuer un sticker à votre nom",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      try {
        const quotedSticker = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage;
        if (!quotedSticker) {
          await sock.sendMessage(from, { text: "⚠️ Réponds à un sticker pour le réassigner." });
          return;
        }

        const stream = await downloadContentFromMessage(quotedSticker, "sticker");
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const sticker = new Sticker(buffer, {
          pack: "",
          author: sender,
          type: StickerTypes.FULL,
          quality: 80,
        });

        // Réaction emoji après “take”
        await sock.sendMessage(from, { react: { text: "🪄", key: msg.key } });

        // Envoi du sticker
        await sock.sendMessage(from, { sticker: await sticker.build() }, { quoted: msg });

      } catch (e) {
        console.error("❌ Erreur take :", e);
        await sock.sendMessage(from, { text: "❌ Erreur take : " + e.message });
      }
    }
  },
  {
    name: "vv",
    description: "Récupère le média vue unique",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      try {
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) return await sendErrorReply(sock, from, msg, sender, "⚠️ Réponds à une photo, vidéo ou audio vue unique.");

        const innerMsg = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessageV2Extension?.message || quoted;

        if (innerMsg.imageMessage) {
          const stream = await downloadContentFromMessage(innerMsg.imageMessage, "image");
          let buffer = Buffer.from([]);
          for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
          await sock.sendMessage(from, { image: buffer, caption: "📸 Vue unique désactivée" }, { quoted: msg });
          await sock.sendMessage(from, { react: { text: "📸", key: msg.key } });
          return;
        }

        if (innerMsg.videoMessage) {
          const stream = await downloadContentFromMessage(innerMsg.videoMessage, "video");
          let buffer = Buffer.from([]);
          for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
          await sock.sendMessage(from, { video: buffer, caption: "🎥 Vue unique désactivée" }, { quoted: msg });
          await sock.sendMessage(from, { react: { text: "🎥", key: msg.key } });
          return;
        }

        if (innerMsg.audioMessage) {
          const stream = await downloadContentFromMessage(innerMsg.audioMessage, "audio");
          let buffer = Buffer.from([]);
          for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
          await sock.sendMessage(from, { audio: buffer, mimetype: "audio/mp4", ptt: innerMsg.audioMessage.ptt || false }, { quoted: msg });
          await sock.sendMessage(from, { react: { text: "🎵", key: msg.key } });
          return;
        }

        await sendErrorReply(sock, from, msg, sender, "❌ Pas une photo, vidéo ou audio vue unique.");
      } catch (e) {
        console.error("❌ Erreur vv :", e);
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur vv : " + e.message);
      }
    }
  },
  {
    name: "photo",
    description: "Transforme un sticker en photo",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      try {
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage;
        if (!quoted) return await sendErrorReply(sock, from, msg, sender, "⚠️ Réponds à un sticker pour le transformer en photo.");

        const stream = await downloadContentFromMessage(quoted, "sticker");
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        await sendRichReply(sock, from, msg, [sender], "✅ Sticker converti en photo !");
        await sock.sendMessage(from, { image: buffer, caption: "🖼️ Sticker converti en photo" }, { quoted: msg });
        await sock.sendMessage(from, { react: { text: "🖼️", key: msg.key } });

      } catch (e) {
        console.error("❌ Erreur photo :", e);
        await sendErrorReply(sock, from, msg, sender, "❌ Erreur conversion sticker → photo : " + e.message);
      }
    }
  }
];

export default mediaCommands;