import chalk from "chalk";

// =================== CONFIG ===================
export const statusProtections = {
  antiLink: false,
  antiPromote: false,
  antiDemote: false,
  antiBot: false,
  antiTag: false,
  antiSpam: false
};

// =================== REGEX ===================
const sax = /^[!?#.$%&*+\-\/:;=?@^_`~\u2700-\u27BF\uE000-\uF8FF]/;

// =================== SPAM TRACKER ===================
const spamTracker = {}; // { groupId: { sender: [timestamps] } }

// =================== HELPERS ===================

// Normalise un JID ou numéro WhatsApp en simple numéro
export function getBareNumber(input) {
  if (!input) return "";
  const s = String(input);
  const beforeAt = s.split("@")[0];
  const beforeColon = beforeAt.split(":")[0];
  return beforeColon.replace(/[^0-9]/g, "");
}

// Protège le bot (qui est aussi l’owner)
export function isProtected(sender) {
  const bareSender = getBareNumber(sender);
  const ownersList = global.owners || []; // ownerId + ownerLid (bot)
  return ownersList.includes(bareSender);
}

export function getMessageText(msg) {
  return (
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    msg.message.imageMessage?.caption ||
    msg.message.videoMessage?.caption
  ) || "";
}

export async function isBotAdmin(sock, groupId) {
  try {
    const metadata = await sock.groupMetadata(groupId);
    const botId = sock.user.id;
    const botInfo = metadata.participants.find(p => p.id === botId);
    return botInfo?.admin !== null;
  } catch {
    return false;
  }
}

// =================== ANTI FONCTIONS ===================

// Anti-Link
export function antiLink(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusProtections.antiLink) return;
    for (const msg of messages) {
      if (!msg.message) continue;
      const from = msg.key.remoteJid;
      if (!from.endsWith("@g.us")) continue;

      const sender = msg.key.participant || from;
      if (isProtected(sender)) continue;

      const text = getMessageText(msg);
      if (!text) continue;

      const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9.-]+\.[a-z]{2,}\b)/gi;
      if (linkRegex.test(text)) {
        try {
          await sock.sendMessage(from, { delete: msg.key });
          console.log(chalk.yellow(`[ANTI-LINK] Lien supprimé de ${sender} dans ${from}`));
        } catch (e) { console.error(e); }
      }
    }
  });
}

// Anti-Promote
export function antiPromote(sock) {
  sock.ev.on("group-participants.update", async (update) => {
    if (!statusProtections.antiPromote) return;
    if (update.action !== "promote") return;

    try {
      for (const participant of update.participants) {
        if (isProtected(participant)) continue;
        await sock.groupParticipantsUpdate(update.id, [participant], "demote");
        console.log(chalk.yellow(`[ANTI-PROMOTE] ${participant} rétrogradé dans ${update.id}`));
      }
    } catch (e) { console.error(e); }
  });
}

// Anti-Demote
export function antiDemote(sock) {
  sock.ev.on("group-participants.update", async (update) => {
    if (!statusProtections.antiDemote) return;
    if (update.action !== "demote") return;

    try {
      for (const participant of update.participants) {
        if (isProtected(participant)) continue;
        await sock.groupParticipantsUpdate(update.id, [participant], "promote");
        console.log(chalk.yellow(`[ANTI-DEMOTE] ${participant} re-promu dans ${update.id}`));
      }
    } catch (e) { console.error(e); }
  });
}

// Anti-Bot / Anti-Command
export function antiBot(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusProtections.antiBot) return;
    for (const msg of messages) {
      if (!msg.message) continue;
      const from = msg.key.remoteJid;
      if (!from.endsWith("@g.us")) continue;

      const sender = msg.key.participant || from;
      if (isProtected(sender) || msg.key.fromMe) continue;

      const text = getMessageText(msg);
      if (!text) continue;

      try {
        if (sax.test(text)) {
          await sock.sendMessage(from, { delete: msg.key });
          await sock.groupParticipantsUpdate(from, [sender], "remove");
          console.log(chalk.red(`[ANTI-BOT] ${sender} kické pour message suspect dans ${from}`));
        }
      } catch (err) { console.error("[ANTI-BOT]", err.message); }
    }
  });
}

// Anti-Tag
export function antiTag(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusProtections.antiTag) return;
    for (const msg of messages) {
      if (!msg.message) continue;
      const from = msg.key.remoteJid;
      if (!from.endsWith("@g.us")) continue;

      const sender = msg.key.participant || from;
      if (isProtected(sender) || msg.key.fromMe) continue;

      const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (mentions.some(m => (global.owners || []).includes(getBareNumber(m)))) {
        try {
          await sock.sendMessage(from, { delete: msg.key });
          await sock.groupParticipantsUpdate(from, [sender], "remove");
          console.log(chalk.red(`[ANTI-TAG] ${sender} kické pour mention dans ${from}`));
        } catch (err) { console.error("[ANTI-TAG]", err.message); }
      }
    }
  });
}

// Anti-Spam
export function antiSpam(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!statusProtections.antiSpam) return;
    for (const msg of messages) {
      if (!msg.message) continue;
      const from = msg.key.remoteJid;
      if (!from.endsWith("@g.us")) continue;

      const sender = msg.key.participant || from;
      if (isProtected(sender) || msg.key.fromMe) continue;

      const now = Date.now();
      if (!spamTracker[from]) spamTracker[from] = {};
      if (!spamTracker[from][sender]) spamTracker[from][sender] = [];
      spamTracker[from][sender].push(now);
      spamTracker[from][sender] = spamTracker[from][sender].filter(ts => now - ts <= 3000); // 3s

      if (spamTracker[from][sender].length >= 5) {
        try {
          await sock.sendMessage(from, { delete: msg.key });
          await sock.groupParticipantsUpdate(from, [sender], "remove");
          spamTracker[from][sender] = [];
          console.log(chalk.red(`[ANTI-SPAM] ${sender} kické pour spam dans ${from}`));
        } catch {}
      }
    }
  });
}

// =================== INIT ===================
export function initProtections(sock) {
  antiLink(sock);
  antiPromote(sock);
  antiDemote(sock);
  antiBot(sock);
  antiTag(sock);
  antiSpam(sock);
}