import { getMode } from "../index.js";

export const name = "menu";

export async function execute(sock, msg, args) {
  try {
    const from = msg.key.remoteJid;

    const totalSeconds = process.uptime();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const uptime = `${hours}h ${minutes}m ${seconds}s`;

    const mode = getMode();
    const modeText = mode === "private" ? "🔒 ᴘʀɪᴠᴇ" : "🌐 ᴘᴜʙʟɪᴄ";

    const text = `
┏❍ *ʀᴀɪᴢᴇʟ xᴍᴅ* ❍
┃ • 👤 ᴜᴛɪʟɪsᴀᴛᴇᴜʀ : ${msg.pushName || "ɪɴᴠɪᴛᴇ"}
┃ • ⚙️ ᴍᴏᴅᴇ       : ${modeText}
┃ • ⏱️ ᴜᴘᴛɪᴍᴇ     : ${uptime}
┃ • 🧠 ᴠᴇʀꜱɪᴏɴ    : 1.0
┃ • 👑 ᴅᴇᴠ        : ʀᴀɪᴢᴇʟ
┗◇

┏❍ *ɢᴇɴᴇʀᴀʟ* ❍
┃ • ᴍᴇɴᴜ
┃ • ʙᴜɢᴍᴇɴᴜ
┃ • ᴘʀᴇᴍɪᴜᴍᴍᴇɴᴜ
┗◇

┏❍ *ɢʀᴏᴜᴘᴇ* ❍
┃ • ᴀᴅᴅ
┃ • ᴋɪᴄᴋ
┃ • ᴋɪᴄᴋᴀʟʟ
┃ • ᴘʀᴏᴍᴏᴛᴇ
┃ • ᴅᴇᴍᴏᴛᴇ
┃ • ᴘʀᴏᴍᴏᴛᴇᴀʟʟ
┃ • ᴅᴇᴍᴏᴛᴇᴀʟʟ
┃ • ᴅᴇsᴄ
┃ • ʟɪɴᴋ
┃ • ᴍᴜᴛᴇ
┃ • ᴜɴᴍᴜᴛᴇ
┃ • ᴘᴜʀɢᴇ
┃ • ʟᴇᴀᴠᴇ
┃ • ɢᴘᴘ
┗◇

┏❍ *ᴜᴛɪʟɪᴛᴀɪʀᴇs* ❍
┃ • ɪᴀ
┃ • ᴘɪɴɢ
┃ • ᴏᴡɴᴇʀ
┃ • ᴍᴏᴅᴇ
┃ • ᴅᴇᴠɪᴄᴇ
┃ • sᴜᴅᴏ
┃ • sᴇᴛᴘʀᴇꜰɪx
┃ • ᴄʟᴇᴀɴᴘʀᴇꜰɪx
┃ • ɴᴇᴡs
┃ • ᴄᴏɴɴᴇᴄᴛ
┃ • ᴡᴇᴀᴛʜᴇʀ
┃ • ᴅʟᴛ
┃ • ᴄᴀʟᴄ
┃ • ᴛʀᴀɴsʟᴀᴛᴇ
┗◇

┏❍ *ᴘʀᴏᴛᴇᴄᴛɪᴏɴs* ❍
┃ • ᴀɴᴛɪʟɪɴᴋ
┃ • ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ
┃ • ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ
┃ • ᴀɴᴛɪʙᴏᴛ
┃ • ᴀɴᴛɪᴠɪᴇᴡᴏɴᴄᴇ
┃ • ᴀɴᴛɪᴅᴇʟᴇᴛᴇ
┃ • ᴀɴᴛɪʟᴏᴄ
┃ • ᴀɴᴛɪsᴛɪᴄᴋᴇʀ
┃ • ᴀɴᴛɪᴍᴇssᴀɢᴇ
┃ • ᴀɴᴛɪᴘɪᴄᴛᴜʀᴇ
┃ • ᴀɴᴛɪᴀᴜᴅɪᴏ
┃ • ᴀɴᴛɪᴠɪᴅᴇᴏ
┗◇

┏❍ *ᴏᴘᴛɪᴏɴs* ❍
┃ • ᴀᴜᴛᴏʀᴇᴀᴄᴛ
┃ • ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ
┃ • ᴀᴜᴛᴏʀᴇᴀᴅ
┃ • ᴀᴜᴛᴏᴛʏᴘɪɴɢ
┃ • ᴀᴜᴛᴏʀᴇᴀᴅsᴛᴀᴛᴜs
┃ • ᴀᴜᴛᴏʙɪᴏ
┃ • ᴀɴᴛɪsᴘᴀᴍ
┃ • ᴀᴜᴛᴏʙᴠɴ
┃ • ᴡᴇʟᴄᴏᴍᴇ
┃ • ʀᴇᴘᴏɴs
┗◇

┏❍ *ᴍᴇᴅɪᴀ* ❍
┃ • sᴛɪᴄᴋᴇʀ
┃ • ᴛᴏᴀᴜᴅɪᴏ
┃ • ᴛᴏᴠɪᴅᴇᴏ
┃ • ɪᴍɢ
┃ • ᴘʟᴀʏ
┃ • ʜᴅ
┃ • ᴛᴛs
┃ • ᴛᴀᴋᴇ
┃ • ᴠᴠ
┃ • sᴀᴠᴇ
┃ • ᴘʜᴏᴛᴏ
┃ • ᴘᴘ
┗◇

┏❍ *ᴛᴀɢ* ❍
┃ • ᴛᴀɢᴀʟʟ
┃ • ᴛᴀɢ
┃ • ᴛᴀɢᴄʀᴇᴀᴛᴏʀ
┃ • sᴇᴛᴛᴀɢ
┃ • ᴛᴀɢᴀᴅᴍɪɴ
┗◇
> *_Powered by DEV-RAIZEL_*
`;

    // Envoi de l'image avec le menu
    await sock.sendMessage(
      from,
      {
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: text
      },
      { quoted: msg }
    );

    // Réaction emoji automatique 🩸 pour le menu
    await sock.sendMessage(from, { react: { text: "🩸", key: msg.key } });

    // Envoi de l'audio
    await sock.sendMessage(
      from,
      {
        audio: { url: "https://files.catbox.moe/f103si.mp3" },
        mimetype: "audio/mpeg"
      },
      { quoted: msg }
    );

  } catch (err) {
    console.error("❌ Erreur commande menu :", err);
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: "⚠️ Impossible d’afficher le menu." },
      { quoted: msg }
    );
  }
}