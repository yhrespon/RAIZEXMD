import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import sharp from "sharp";

// ─── UTIL ──────────────────────────────
export function getBareNumber(input) {
  if (!input) return "";
  const s = String(input);
  return s.split("@")[0].split(":")[0].replace(/[^0-9]/g, "");
}

export async function downloadBuffer(message, type) {
  const stream = await downloadContentFromMessage(message, type);
  let buffer = Buffer.from([]);
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
  return buffer;
}

// Assure l’existence du dossier tmp
const TMP_DIR = path.join("./tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

// ─── COMMANDES ─────────────────────────
const mediaavCommands = [

  // ===== HD =====
  {
    name: "hd",
    description: "Renvoie l'image en HD",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      try {
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !("imageMessage" in quoted)) {
          return await sock.sendMessage(from, { text: "> _⚠️ Réponds à une image._" });
        }

        const buffer = await downloadBuffer(quoted.imageMessage, "image");
        const hdBuffer = await sharp(buffer).resize({ width: 1080 }).toBuffer();
        await sock.sendMessage(from, { image: hdBuffer, caption: "> _*Image HD renvoyée*_ " });

      } catch (err) {
        console.error(err);
        await sock.sendMessage(from, { text: "> _❌ Impossible de renvoyer l'image en HD._" });
      }
    }
  },

  // ===== TOAUDIO =====
  {
    name: "toaudio",
    description: "Convertit une vidéo en audio",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      try {
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !("videoMessage" in quoted)) {
          return await sock.sendMessage(from, { text: "> _⚠️ Réponds à une vidéo._" });
        }

        const buffer = await downloadBuffer(quoted.videoMessage, "video");
        const tmpVideo = path.join(TMP_DIR, `${Date.now()}.mp4`);
        const tmpAudio = tmpVideo.replace(".mp4", ".mp3");
        fs.writeFileSync(tmpVideo, buffer);

        await new Promise((resolve, reject) => {
          ffmpeg(tmpVideo)
            .noVideo()
            .audioCodec("libmp3lame")
            .audioBitrate("128k")
            .save(tmpAudio)
            .on("end", resolve)
            .on("error", reject);
        });

        if (!fs.existsSync(tmpAudio)) throw new Error("Audio conversion failed");

        const audioBuffer = fs.readFileSync(tmpAudio);
        await sock.sendMessage(from, {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          fileName: `audio_${Date.now()}.mp3`,
          ptt: false
        });

        fs.unlinkSync(tmpVideo);
        fs.unlinkSync(tmpAudio);

      } catch (err) {
        console.error(err);
        await sock.sendMessage(from, { text: "> _❌ Impossible de convertir la vidéo en audio._" });
      }
    }
  },

  // ===== TOVIDEO =====
  {
    name: "tovideo",
    description: "Convertit un audio en vidéo avec image de couverture",
    async execute(sock, msg) {
      const from = msg.key.remoteJid;
      try {
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !("audioMessage" in quoted)) {
          return await sock.sendMessage(from, { text: "> _⚠️ Réponds à un audio._" });
        }

        const buffer = await downloadBuffer(quoted.audioMessage, "audio");
        const tmpAudio = path.join(TMP_DIR, `${Date.now()}.mp3`);
        const tmpVideo = tmpAudio.replace(".mp3", ".mp4");
        fs.writeFileSync(tmpAudio, buffer);

        const coverImage = path.join("./assets", "cover.jpg");
        if (!fs.existsSync(coverImage)) throw new Error("Image de couverture introuvable");

        // Conversion optimisée
        await new Promise((resolve, reject) => {
          ffmpeg(tmpAudio)
            .input(coverImage)
            .loop(1) // loop 1 seconde pour limiter la charge
            .outputOptions([
              "-shortest",
              "-t 5",           // durée max 5s
              "-c:v libx264",
              "-c:a aac",
              "-pix_fmt yuv420p",
              "-r 15",           // frame rate réduit
              "-b:a 128k"        // audio compressé
            ])
            .save(tmpVideo)
            .on("end", resolve)
            .on("error", reject);
        });

        if (!fs.existsSync(tmpVideo)) throw new Error("Video conversion failed");

        const videoBuffer = fs.readFileSync(tmpVideo);
        await sock.sendMessage(from, { video: videoBuffer, fileName: `video_${Date.now()}.mp4` });

        fs.unlinkSync(tmpAudio);
        fs.unlinkSync(tmpVideo);

      } catch (err) {
        console.error(err);
        await sock.sendMessage(from, { text: "> _❌ Impossible de convertir l'audio en vidéo._" });
      }
    }
  }

];

export default mediaavCommands;