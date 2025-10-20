import fs from "fs";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

const SUDO_FILE = "./sudo.json";

// === Helpers ===
function loadSudo() {
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

function saveSudo(list) {
  fs.writeFileSync(SUDO_FILE, JSON.stringify(list, null, 2));
}

let sudoList = loadSudo();

export const name = "sudo";
export const aliases = ["superuser", "admin"];

export async function execute(sock, msg, args) {
  const jid = msg.key.remoteJid;
  const sender = msg.pushName || getBareNumber(msg.key.participant);

  try {
    const cmd = args[0]?.toLowerCase(); // add / del / list
    let target;

    // Détection du numéro : reply ou mention ou argument
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      target = getBareNumber(msg.message.extendedTextMessage.contextInfo.participant);
    } else if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
      target = getBareNumber(msg.message.extendedTextMessage.contextInfo.mentionedJid[0]);
    } else if (args.length > 1) {
      target = args[1].replace(/[^0-9]/g, "");
    }

    if (cmd === "add") {
      if (!target) return await sendErrorReply(sock, jid, msg, sender, "⚠️ Mentionne ou donne le numéro à ajouter en sudo.");
      if (!sudoList.includes(target)) {
        sudoList.push(target);
        saveSudo(sudoList);
      }
      await sendRichReply(sock, jid, msg, [target], `✅ ${target} ajouté à la liste sudo.`, "👑");

    } else if (cmd === "del") {
      if (!target) return await sendErrorReply(sock, jid, msg, sender, "⚠️ Mentionne ou donne le numéro à retirer du sudo.");
      sudoList = sudoList.filter(n => n !== target);
      saveSudo(sudoList);
      await sendRichReply(sock, jid, msg, [target], `🚫 ${target} retiré de la liste sudo.`, "❌");

    } else if (cmd === "list") {
      if (sudoList.length === 0) {
        await sendRichReply(sock, jid, msg, [sender], "📭 Aucun sudo défini.", "ℹ️");
      } else {
        const listText = sudoList.map((n, i) => `${i + 1}. ${n}`).join("\n");
        await sendRichReply(sock, jid, msg, [sender], `👑 Liste des sudo:\n\n${listText}`, "👑");
      }

    } else {
      await sendErrorReply(sock, jid, msg, sender, "⚠️ Utilisation : !sudo add @user | !sudo del @user | !sudo list");
    }

  } catch (error) {
    console.error("[sudo.execute]", error);
    await sendErrorReply(sock, jid, msg, sender, "❌ Une erreur est survenue lors de la commande sudo.");
  }
}