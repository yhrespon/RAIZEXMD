import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const name = "autoread";
export const aliases = ["readauto"];

// ⚡ Variable globale
if (global.autoreadEnabled === undefined) global.autoreadEnabled = false;

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt))
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autoread on/off");

    global.autoreadEnabled = opt === "on"; // ⚡ Activation globale

    await sendRichReply(
      sock,
      jid,
      msg,
      [sender],
      `✅ AutoRead global ${opt === "on" ? "activé" : "désactivé"}`
    );
  } catch {
    await sendErrorReply(sock, jid, msg, sender, "❌ Erreur lors de l'activation d'AutoRead.");
  }
}

export function autoreadEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!global.autoreadEnabled) return; // ⚡ Vérification globale
    try {
      for (const m of messages) {
        if (!m?.message) continue;
        await sock.readMessages([{ remoteJid: m.key.remoteJid, id: m.key.id, participant: m.key.participant }])
          .catch(() => {});
      }
    } catch {}
  });
}