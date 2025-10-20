export const name = "leave";
export const aliases = ["left", "exit"];

// Fonction getBareNumber locale
function getBareNumber(input) {
  if (!input) return "";
  const s = String(input);
  const beforeAt = s.split("@")[0];
  const beforeColon = beforeAt.split(":")[0];
  return beforeColon.replace(/[^0-9]/g, "");
}

// Fonction loadSudo locale
import fs from "fs";
const SUDO_FILE = "./sudo.json";
function loadSudo() {
  if (!fs.existsSync(SUDO_FILE)) return [];
  return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8"));
}

export async function execute(sock, msg, args) {
  const from = msg.key.remoteJid;

  // Vérifier que c'est un groupe
  if (!from.endsWith("@g.us")) return;

  // Vérifier si l'utilisateur est owner ou sudo
  const sender = msg.key.fromMe ? sock.user.id : (msg.key.participant || from);
  const senderNum = getBareNumber(sender);

  const allowedUsers = [
    ...(global.owners || []),
    ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))
  ];

  if (!allowedUsers.includes(senderNum)) return;

  try {
    // Réaction 🦎 au message original
    await sock.sendMessage(from, { react: { text: "🦎", key: msg.key } });

    // Quitter le groupe directement
    await sock.groupLeave(from);
  } catch (err) {
    console.error("[leave.execute]", err);
  }
}