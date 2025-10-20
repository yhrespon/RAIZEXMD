import { getBareNumber } from "../index.js";
import { sendRichReply, sendErrorReply } from "../utils.js";

export const name = "owner";
export const aliases = ["owners", "dev", "creator"];

export async function execute(sock, msg, args, from) {
  try {
    const senderJid = msg.key.fromMe
      ? sock.user.id
      : (msg.key.participant || from);
    const senderNum = getBareNumber(senderJid);

    const sudoList = loadSudo().map(n => String(n).replace(/[^0-9]/g, ""));
    const allowedNumbers = [
      ...(global.owners || []),
      ...sudoList
    ];

    if (!allowedNumbers.includes(senderNum)) {
      return await sendErrorReply(
        sock,
        from,
        msg,
        senderNum,
        "❌ Accès réservé aux owners/sudo."
      );
    }

    const teks = `
Rejoignez la communauté :
   • 📺 WhatsApp Channel : https://whatsapp.com/channel/0029Vb6DOLCCxoAvIfxngr3P
   • ✨ Telegram : https://t.me/RAIZEL_SUPPORT

💬 Contact :
   • WhatsApp : wa.me/237699777530
   • Telegram : t.me/devraizel

⚠️ Merci pour votre soutien !
By DEV-RAIZEL
    `;

    await sendRichReply(sock, from, msg, [], teks.trim());

  } catch (err) {
    console.error("Erreur commande owner :", err);
    await sendErrorReply(sock, from, msg, senderNum, "❌ Une erreur est survenue.");
  }
}

function loadSudo() {
  try {
    return JSON.parse(require("fs").readFileSync("./sudo.json", "utf-8"));
  } catch {
    return [];
  }
}