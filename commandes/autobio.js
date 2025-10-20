import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import { readJSON, writeJSON } from "../lib/dataManager.js";

export const name = "autobio";
export const aliases = ["bioauto"];
const FILE = "autobio.json";

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);
  try {
    const opt = (args[0] || "").toLowerCase();
    const text = args.slice(1).join(" ") || "";
    if (!["on", "off"].includes(opt)) {
      return await sendErrorReply(sock, jid, msg, sender, "⚙️ Usage: !autobio on/off <texte>");
    }
    const cfg = readJSON(FILE);
    cfg[jid] = opt === "on" ? text : false;
    writeJSON(FILE, cfg);
    await sendRichReply(sock, jid, msg, [sender], `✅ AutoBio ${opt === "on" ? "activé" : "désactivé"}`);
  } catch (error) {
    console.error("[autobio.execute]", error);
    await sendErrorReply(sock, jid, msg, sender, "❌ Erreur lors de l'activation d'AutoBio.");
  }
}

export function autobioEvents(sock) {
  setInterval(async () => {
    try {
      const cfg = readJSON(FILE);
      for (const jid in cfg) {
        if (!cfg[jid]) continue;
        await sock.updateProfileStatus(cfg[jid]).catch(()=>{});
      }
    } catch (error) {
      console.error("[autobioEvents]", error.message);
    }
  }, 60000);
}