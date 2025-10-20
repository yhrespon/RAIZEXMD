import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import { readJSON, writeJSON } from "../lib/dataManager.js";

export const name = "autoreadstatus";
export const aliases = ["readstatusauto"];
const FILE = "autoreadstatus.json";

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autoreadstatus on/off");
    }
    const cfg = readJSON(FILE);
    cfg[jid] = opt === "on";
    writeJSON(FILE, cfg);
    await sendRichReply(sock, jid, msg, [sender], `✅ AutoReadStatus ${opt === "on" ? "activé" : "désactivé"}`);
  } catch (e) {
    console.error("[autoreadstatus.execute]", e);
    await sendErrorReply(sock, jid, msg, sender, "❌ Erreur lors de l'activation d'AutoReadStatus.");
  }
}

// ===================
// Lecture automatique ou réaction comme statusLike
export function autoreadstatusEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      for (const m of messages) {
        if (!m?.message || m.key.remoteJid !== "status@broadcast") continue;

        const cfg = readJSON(FILE);
        if (!Object.values(cfg).some(v => v)) continue;

        const senderId = getBareNumber(m.key.participant);
        console.log(`🔹 Status détecté de ${senderId}`);

        // Lecture automatique
        await sock.readMessages([{ remoteJid: m.key.remoteJid, id: m.key.id, participant: m.key.participant }]);

        // Ou réaction (emoji)
        await sock.sendMessage(m.key.participant, {
          react: { text: "💚", key: m.key }
        });
      }
    } catch (error) {
      console.error("[autoreadstatusEvents]", error.message);
    }
  });
}