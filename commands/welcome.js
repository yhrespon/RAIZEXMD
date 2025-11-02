// commands/welcome.js
import fs from "fs";
import { readJSON, writeJSON } from "../lib/dataManager.js";

export const name = "welcome";
export const aliases = ["bienvenue", "bye"];
const FILE = "welcome.json";

// =======================
// SUDO / OWNER CHECK
function loadSudo() {
  const SUDO_FILE = "./sudo.json";
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

function isAllowed(senderNum) {
  const allowedUsers = [
    ...(global.owners || []),
    ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))
  ];
  return allowedUsers.includes(senderNum);
}

// =======================
// COMMANDE WELCOME ON/OFF
export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || msg.key.participant;
  const senderNum = getBareNumber(msg.key.participant);

  try {
    // Vérification private
    if (!isAllowed(senderNum)) {
      return await sock.sendMessage(jid, { text: "> _*❌ Cette commande est réservée aux owners/sudo*_." }, { quoted: msg });
    }

    if (!jid?.endsWith?.("@g.us")) {
      return await sock.sendMessage(jid, { text: "> _*❌ Utilise cette commande dans un groupe*_." }, { quoted: msg });
    }

    const opt = (args[0] || "").toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return await sock.sendMessage(jid, { text: "> _*⚙️ Utilisation : !welcome on / off*_" }, { quoted: msg });
    }

    const cfg = readJSON(FILE);
    cfg[jid] = opt === "on";
    writeJSON(FILE, cfg);

    const text = `✅ Welcome ${opt === "on" ? "activé" : "désactivé"} pour ce groupe !`;
    await sock.sendMessage(jid, { text }, { quoted: msg });

    await sock.sendMessage(jid, { react: { text: "💌", key: msg.key } });

  } catch (e) {
    console.error("[welcome.execute]", e);
    await sock.sendMessage(jid, { text: "> _*❌ Erreur welcome : *_" + e.message }, { quoted: msg });
  }
}

// =======================
// ÉVÉNEMENTS JOIN / LEAVE
export function welcomeEvents(sock) {
  sock.ev.on("group-participants.update", async (update) => {
    try {
      const cfg = readJSON(FILE);
      if (!cfg[update.id]) return;

      const metadata = await sock.groupMetadata(update.id);
      const groupName = metadata.subject;
      const groupDesc = metadata.desc || "📭 Aucune description définie pour ce groupe.";

      for (const participant of update.participants) {
        // Récupération photo + bio
        let pp = "https://files.catbox.moe/2yz2qu.jpg";
        try { pp = await sock.profilePictureUrl(participant, "image"); } catch {}

        let status = "📵 Aucune bio disponible.";
        try {
          const res = await sock.fetchStatus(participant);
          if (res?.status) status = res.status;
        } catch {}

        const name = participant.split("@")[0];
        let text = "";

        if (update.action === "add") {
          text = `👋 *Bienvenue @${name}* dans *${groupName}* 💫

🧍‍♂️ *Bio du membre :*
> ${status}

📘 *Description du groupe :*
> ${groupDesc}`;
        } else if (update.action === "remove") {
          text = `👋 *@${name}* a quitté *${groupName}* 💨

🧍‍♂️ *Bio du membre :*
> ${status}

📘 *Description du groupe :*
> ${groupDesc}`;
        }

        await sock.sendMessage(update.id, {
          image: { url: pp },
          caption: text,
          mentions: [participant]
        });
      }
    } catch (e) {
      console.error("[welcomeEvents]", e);
    }
  });
}
