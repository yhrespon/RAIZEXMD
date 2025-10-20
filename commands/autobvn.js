import fs from "fs";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import { readJSON, writeJSON } from "../lib/dataManager.js";

export const name = "autobvn";
export const aliases = ["bvnauto"];
const FILE = "autobvn.json";
const lastSentMap = {}; // Anti-spam par chat

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  try {
    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autobvn on/off");
    }
    const cfg = readJSON(FILE);
    cfg[jid] = opt === "on";
    writeJSON(FILE, cfg);
    await sendRichReply(sock, jid, msg, [sender], `✅ AutoBVN ${opt === "on" ? "activé" : "désactivé"}`);
  } catch (error) {
    console.error("[autobvn.execute]", error);
    await sendErrorReply(sock, jid, msg, sender, "❌ Erreur lors de l'activation d'AutoBVN.");
  }
}

export function autobvnEvents(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      for (const m of messages) {
        if (!m?.message) continue;

        const jid = m.key.remoteJid;
        const cfg = readJSON(FILE);
        if (!cfg[jid]) continue;

        // 🔹 Récupérer ID/LID du bot
        const botId = getBareNumber(sock.user?.id);
        const botLid = getBareNumber(sock.user?.lid);
        const globalOwnerIds = global.owners?.map(n => getBareNumber(n)) || [];

        const senderId = getBareNumber(m.key.participant || jid);

        // 🔹 Ignorer si message du bot lui-même
        if ([botId, botLid, ...globalOwnerIds].includes(senderId)) continue;

        // 🔹 Anti-spam : un seul PTT par série
        const now = Date.now();
        const lastSent = lastSentMap[jid] || 0;
        if (now - lastSent < 3000) continue; // délai 3s
        lastSentMap[jid] = now;

        const vnPath = "./media/bvn.mp3";
        if (!fs.existsSync(vnPath)) continue;

        await sock.sendMessage(jid, { audio: fs.readFileSync(vnPath), ptt: true });
      }
    } catch (error) {
      console.error("[autobvnEvents]", error.message);
    }
  });
}