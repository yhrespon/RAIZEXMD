// commands/getChannelId.js
import { sendRichReply, sendErrorReply } from "../utils.js";

export default async function getChannelId(sock, msg, args) {
  try {
    if (!args[0]) {
      return await sendErrorReply(sock, msg, "🔗 Donne le lien de la chaîne WhatsApp.");
    }

    const link = args[0].trim();
    const match = link.match(/whatsapp\.com\/channel\/([A-Za-z0-9]+)/);

    if (!match) {
      return await sendErrorReply(sock, msg, "❌ Lien de chaîne non valide !");
    }

    const code = match[1];
    const id = `120363${BigInt("0x" + Buffer.from(code, "base64").toString("hex")) % BigInt(10 ** 14)}@newsletter`;

    await sendRichReply(sock, msg, {
      text: `✅ **ID de la chaîne :**\n\`\`\`${id}\`\`\``
    });
  } catch (err) {
    console.error(err);
    await sendErrorReply(sock, msg, "⚠️ Erreur lors de la récupération de l'ID.");
  }
}
