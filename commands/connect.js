import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export default {
  name: "connect",
  description: "Génère un code d'appairage pour un numéro WhatsApp (propriétaire uniquement)",
  async execute(sock, msg, args, from) {
    // Vérifier que l'expéditeur est le propriétaire
    const sender = msg.key.remoteJid.endsWith("@g.us") ? msg.key.participant : msg.key.remoteJid;
    const senderNum = getBareNumber(sender);
    const ownerNum = global.owners?.[0];

    if (senderNum !== ownerNum) {
      return sendErrorReply(sock, msg, from, "Seul le propriétaire peut utiliser cette commande.");
    }

    let targetNumber = args[0];
    if (!targetNumber) {
      targetNumber = ownerNum;
    } else {
      targetNumber = getBareNumber(targetNumber);
    }

    if (!targetNumber || targetNumber.length < 10) {
      return sendErrorReply(sock, msg, from, "Numéro invalide. Utilisez : .connect 2376XXXXXXXX");
    }

    // Vérifier que la méthode existe
    if (typeof sock.requestPairingCode !== "function") {
      return sendErrorReply(sock, msg, from, "La méthode requestPairingCode n'est pas disponible dans cette version de Baileys.");
    }

    try {
      await sendRichReply(sock, msg, from, `🔄 Demande de code d'appairage pour +${targetNumber}...`);
      const code = await sock.requestPairingCode(targetNumber);
      await sendRichReply(sock, msg, from, `✅ Code d'appairage pour +${targetNumber} :\n\`\`\`${code}\`\`\``);
    } catch (error) {
      console.error("Erreur pairing code :", error);
      await sendErrorReply(sock, msg, from, `Erreur : ${error.message}`);
    }
  }
};
