import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import { join } from "path";
import { PassThrough } from "stream";
import { downloadContentFromMessage, downloadMediaMessage, getContentType } from "@whiskeysockets/baileys";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import axios from "axios";
import FormData from "form-data";

ffmpeg.setFfmpegPath(ffmpegPath);

export const media2Commands = [
  {
    name: "url",
    description: "Génère une URL pour un média",
    async execute(sock, m, args) {
      const from = m.key.remoteJid;
      const sender = m.pushName || getBareNumber(m.key.participant);

      try {
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
        let type = quoted.imageMessage ? "image" : quoted.videoMessage ? "video" : quoted.audioMessage ? "audio" : null;
        if (!type) return await sendErrorReply(sock, from, m, sender, "⚠️ Réponds à un média pour générer une URL.");

        const stream = await downloadContentFromMessage(quoted[`${type}Message`], type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const tempDir = "./temp";
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        const ext = type === "image" ? "jpg" : type === "video" ? "mp4" : "mp3";
        const filePath = join(tempDir, `media_${Date.now()}.${ext}`);
        fs.writeFileSync(filePath, buffer);

        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", fs.createReadStream(filePath));
        const upload = await axios.post("https://catbox.moe/user/api.php", form, { headers: form.getHeaders() });

        fs.unlinkSync(filePath);

        await sendRichReply(sock, from, m, [sender], `✅ URL générée : ${upload.data}`);
        await sock.sendMessage(from, { react: { text: "🔗", key: m.key } });
      } catch (e) {
        await sendErrorReply(sock, from, m, sender, "❌ Erreur URL : " + e.message);
      }
    }
  },
  {
    name: "save",
    description: "Sauvegarde un média ou texte",
    async execute(sock, m, args) {
      const from = m.key.remoteJid;
      const sender = m.pushName || getBareNumber(m.key.participant);

      try {
        let msg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
        while (msg.ephemeralMessage || msg.viewOnceMessage || msg.viewOnceMessageV2 || msg.documentWithCaptionMessage) {
          msg = msg.ephemeralMessage?.message || msg.viewOnceMessage?.message || msg.viewOnceMessageV2?.message || msg.documentWithCaptionMessage?.message;
        }

        const type = getContentType(msg);

        if (type === "conversation" || type === "extendedTextMessage") {
          const text = msg.conversation || msg.extendedTextMessage?.text || "⚡ Message vide";
          await sock.sendMessage(sock.user.id, { text: `💾 Sauvegarde:\n\n${text}` });
          await sendRichReply(sock, from, m, [sender], "✅ Texte sauvegardé");
          await sock.sendMessage(from, { react: { text: "💾", key: m.key } });
          return;
        }

        const buffer = await downloadMediaMessage({ message: msg }, "buffer", {}, { logger: console });
        let fileName = Date.now().toString();
        let sendContent = {};

        switch (type) {
          case "imageMessage": fileName += ".jpg"; sendContent = { image: buffer, caption: "💾 Sauvegarde image" }; break;
          case "videoMessage": fileName += ".mp4"; sendContent = { video: buffer, caption: "💾 Sauvegarde vidéo" }; break;
          case "audioMessage": fileName += ".mp3"; sendContent = { audio: buffer, mimetype: "audio/mpeg", fileName }; break;
          case "documentMessage": fileName = msg.documentMessage.fileName || fileName + ".doc"; sendContent = { document: buffer, fileName }; break;
          case "stickerMessage": fileName += ".webp"; sendContent = { sticker: buffer }; break;
          default: return await sendErrorReply(sock, from, m, sender, "❌ Type non supporté : " + type);
        }

        await sock.sendMessage(sock.user.id, sendContent);
        await sendRichReply(sock, from, m, [sender], "✅ Média sauvegardé");
        await sock.sendMessage(from, { react: { text: "💾", key: m.key } });

      } catch (e) {
        await sendErrorReply(sock, from, m, sender, "❌ Erreur save : " + e.message);
      }
    }
  },
  {
    name: "play",
    description: "Joue une mélodie depuis YouTube",
    async execute(sock, m, args) {
      const from = m.key.remoteJid;
      const sender = m.pushName || getBareNumber(m.key.participant);
      const title = args.join(" ");
      if (!title) return await sendErrorReply(sock, from, m, sender, "❌ Aucune mélodie spécifiée.");

      try {
        const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(title)}`;
        const { data } = await axios.get(apiUrl);
        if (!data.status || !data.result || !data.result.download_url) throw new Error("Aucune mélodie trouvée.");

        const video = data.result;
        await sock.sendMessage(from, { image: { url: video.thumbnail }, caption: `🎵 ${video.title}\n⏱️ ${video.duration}` }, { quoted: m });
        await sock.sendMessage(from, { audio: { url: video.download_url, mimetype: "audio/mp4", ptt: false } }, { quoted: m });
        await sock.sendMessage(from, { react: { text: "🎵", key: m.key } });

      } catch (err) {
        await sendErrorReply(sock, from, m, sender, "❌ Erreur play : " + err.message);
      }
    }
  },
  {
    name: "img",
    description: "Recherche une image sur Google",
    async execute(sock, m, args) {
      const from = m.key.remoteJid;
      const sender = m.pushName || getBareNumber(m.key.participant);
      const query = args.join(" ");
      if (!query) return await sendErrorReply(sock, from, m, sender, "❌ Mot-clé manquant pour la recherche.");

      try {
        const GOOGLE_API_KEY = "AIzaSyDo09jHOJqL6boMeac-xmPHB-yD9dKOKGU";
        const GOOGLE_CX = "d1a5b18a0be544a0e";

        const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
          params: { q: query, cx: GOOGLE_CX, searchType: "image", key: GOOGLE_API_KEY },
        });

        if (!res.data.items || res.data.items.length === 0) return await sendErrorReply(sock, from, m, sender, "❌ Aucune image trouvée.");

        const imgUrl = res.data.items[Math.floor(Math.random() * res.data.items.length)].link;
        await sock.sendMessage(from, { image: { url: imgUrl }, caption: `🖼️ Sujet : ${query}` }, { quoted: m });
        await sock.sendMessage(from, { react: { text: "🖼️", key: m.key } });

      } catch (err) {
        await sendErrorReply(sock, from, m, sender, "❌ Erreur img : " + err.message);
      }
    }
  }
];

export default media2Commands;