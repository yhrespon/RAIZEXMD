import { readJSON, writeJSON } from "../lib/dataManager.js";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const name = "autorecording";
export const aliases = ["recording", "autovocal"];
const FILE = "autorecording.json";

export async function execute(sock, msg, args) {
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  const jid = msg.key.remoteJid;

  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autorecording on/off");
    }

    // Stockage global
    const cfg = readJSON(FILE);
    cfg.global = opt === "on";
    writeJSON(FILE, cfg);

    await sendRichReply(sock, jid, msg, [sender], `✅ AutoRecording ${opt === "on" ? "activé" : "désactivé"} pour tous les chats`);
  } catch (e) {
    console.error("[autorecording.execute]", e);
    await sendErrorReply(sock, jid, msg, sender, "❌ Une erreur est survenue lors de l'activation d'AutoRecording.");
  }
}

export function autorecordingEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const cfg = readJSON(FILE);
      if (!cfg.global) return; // Si global est désactivé, ne rien faire

      for (const m of messages) {
        if (!m?.message) continue;
        const jid = m.key.remoteJid;

        await sock.sendPresenceUpdate("recording", jid).catch(err =>
          console.error("[autorecording.presence]", err.message)
        );
      }
    } catch (e) {
      console.error("[autorecordingEvents]", e);
    }
  });
}