import chalk from "chalk";

// =================== CONFIG ===================
export const statusSecurity = {
  antiViewOnce: false,
  antiLoc: false,
  antiSticker: false,
  antiMessage: false,
  antiPicture: false,
  antiAudio: false,
  antiVideo: false
};

// =================== HELPERS ===================
export function getBareNumber(input) {
  if (!input) return "";
  const s = String(input);
  const beforeAt = s.split("@")[0];
  const beforeColon = beforeAt.split(":")[0];
  return beforeColon.replace(/[^0-9]/g, "");
}

// Vérifie si c'est un admin du groupe
export async function isAdmin(sock, jid, participant) {
  try {
    const groupMetadata = await sock.groupMetadata(jid);
    const member = groupMetadata.participants.find(p => p.id === participant);
    if (!member) return false;
    return member.admin === "admin" || member.admin === "superadmin";
  } catch (e) {
    console.error(e);
    return false;
  }
}

// Protégé si propriétaire ou admin
export async function isProtected(sock, msg) {
  const bareSender = getBareNumber(msg.key.participant || msg.key.remoteJid);
  const ownersList = global.owners || [];

  if (ownersList.includes(bareSender)) return true;

  if (msg.key.remoteJid.endsWith("@g.us")) { // groupe
    const admin = await isAdmin(sock, msg.key.remoteJid, msg.key.participant || msg.key.remoteJid);
    if (admin) return true;
  }

  return false;
}

export function getMessageContent(msg) {
  return (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    msg.message?.documentMessage?.caption ||
    msg.message?.stickerMessage ||
    msg.message?.audioMessage ||
    msg.message?.locationMessage
  ) || "";
}

// =================== ANTI FONCTIONS ===================

export function antiViewOnce(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiViewOnce) return;
    for (const msg of messages) {
      if (!msg.message?.viewOnceMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-VIEWONCE] Message supprimé de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiLoc(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiLoc) return;
    for (const msg of messages) {
      if (!msg.message?.locationMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-LOC] Localisation supprimée de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiSticker(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiSticker) return;
    for (const msg of messages) {
      if (!msg.message?.stickerMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-STICKER] Sticker supprimé de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiMessage(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiMessage) return;
    for (const msg of messages) {
      const content = getMessageContent(msg);
      if (!content) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-MESSAGE] Message supprimé de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiPicture(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiPicture) return;
    for (const msg of messages) {
      if (!msg.message?.imageMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-PICTURE] Image supprimée de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiAudio(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiAudio) return;
    for (const msg of messages) {
      if (!msg.message?.audioMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-AUDIO] Audio supprimé de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

export function antiVideo(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusSecurity.antiVideo) return;
    for (const msg of messages) {
      if (!msg.message?.videoMessage) continue;
      const from = msg.key.remoteJid;
      if (await isProtected(sock, msg)) continue;

      try {
        await sock.sendMessage(from, { delete: msg.key });
        console.log(chalk.yellow(`[ANTI-VIDEO] Vidéo supprimée de ${msg.key.participant}`));
      } catch (e) { console.error(e); }
    }
  });
}

// =================== INIT ===================
export function initSecurity(sock) {
  antiViewOnce(sock);
  antiLoc(sock);
  antiSticker(sock);
  antiMessage(sock);
  antiPicture(sock);
  antiAudio(sock);
  antiVideo(sock);
}