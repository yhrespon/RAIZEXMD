import { readJSON, writeJSON } from "../lib/dataManager.js";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const name = "autoreact";
export const aliases = ["reactauto", "autolike"];
const FILE = "autoreact.json";

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);

  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autoreact on/off");
    }

    const cfg = readJSON(FILE);
    cfg[jid] = opt === "on";
    writeJSON(FILE, cfg);

    await sendRichReply(sock, jid, msg, [sender], `✅ AutoReact ${opt === "on" ? "activé" : "désactivé"}`);
  } catch (e) {
    console.error("[autoreact.execute]", e);
    await sendErrorReply(sock, jid, msg, sender, "❌ Une erreur est survenue lors de l'activation d'AutoReact.");
  }
}

export function autoreactEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      for (const m of messages) {
        if (!m?.message) continue;

        const jid = m.key.remoteJid;
        const cfg = readJSON(FILE);
        if (!cfg[jid]) continue;

        const emojis = ["😂","🔥","❤️","👍","🤖","⚡"];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        await sock.sendMessage(jid, { react: { text: emoji, key: m.key } }).catch(err =>
          console.error("[autoreact.react]", err.message)
        );
      }
    } catch (e) {
      console.error("[autoreactEvents]", e);
    }
  });
}