import fs from "fs";
import gTTS from "gtts";

export const name = "tts";
export const aliases = ["say"];

/**
 * Envoie un message d'erreur formaté en citation + gras + italique
 */
async function sendTtsError(sock, jid, message) {
  const formatted = `> *_${message}_*`;
  await sock.sendMessage(jid, { text: formatted });
}

export async function execute(sock, m, args) {
  const from = m.key.remoteJid;
  const sender = m.pushName || m.key.participant || from;

  try {
    // Vérifie si c'est en reply
    let text = "";
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (quoted) {
      // Si le message cité contient du texte
      if (quoted.conversation) {
        text = quoted.conversation;
      } else if (quoted.extendedTextMessage?.text) {
        text = quoted.extendedTextMessage.text;
      }
    } else if (args && args.length > 0) {
      text = args.join(" ");
    }

    if (!text) {
      return sendTtsError(sock, from, "❌ Veuillez fournir le texte à convertir en audio ou répondre à un message.");
    }

    const tts = new gTTS(text, "fr");

    // Génération du fichier audio
    const filePath = `./tmp/tts_${Date.now()}.mp3`;
    await new Promise((resolve, reject) => {
      tts.save(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Envoi du message audio
    await sock.sendMessage(from, {
      audio: fs.readFileSync(filePath),
      mimetype: "audio/mpeg",
    });

    // Suppression du fichier temporaire
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Erreur TTS :", err);
    return sendTtsError(sock, from, "❌ Une erreur est survenue lors de la génération de l'audio");
  }
}