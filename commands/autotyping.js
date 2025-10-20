import { readJSON, writeJSON } from "../lib/dataManager.js";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const name = "autotyping";
export const aliases = ["typingauto"];
const FILE = "autotyping.json";

export async function execute(sock, msg, args) {
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  const jid = msg.key.remoteJid;

  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt))
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autotyping on/off");

    // Stockage global
    const cfg = readJSON(FILE);
    cfg.global = opt === "on";
    writeJSON(FILE, cfg);

    await sendRichReply(
      sock,
      jid,
      msg,
      [sender],
      `✅ AutoTyping ${opt === "on" ? "activé" : "désactivé"} pour tous les chats`
    );
  } catch {
    await sendErrorReply(sock, jid, msg, sender, "❌ Erreur lors de l'activation d'AutoTyping.");
  }
}

export function autotypingEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const cfg = readJSON(FILE);
      if (!cfg.global) return; // Si désactivé globalement, ne rien faire

      for (const m of messages) {
        if (!m?.message) continue;
        const jid = m.key.remoteJid;

        await sock.sendPresenceUpdate("composing", jid).catch(() => {});
      }
    } catch {}
  });
}