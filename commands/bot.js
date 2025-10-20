import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import { getMode, setMode } from "../index.js";

export const botCommands = [
  // === MODE PRIVATE / PUBLIC ===
  {
    name: "mode",
    aliases: [],
    emoji: "⚙️",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = getBareNumber(msg.key.fromMe ? sock.user.id : msg.key.participant || from);

      if (!global.owners.includes(sender)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Seul le propriétaire peut changer le mode.");
      }

      const newMode = args[0]?.toLowerCase();
      if (!["private", "public"].includes(newMode)) {
        return await sendErrorReply(sock, from, msg, sender, "Usage: .mode <private|public>");
      }

      setMode(newMode);
      await sendRichReply(sock, from, msg, [msg.key.participant], `✅ Le mode du bot a été changé en : ${newMode}`);
    },
  },

  // === CHANGER LE PREFIXE GLOBAL ===
  {
    name: "setprefix",
    aliases: [],
    emoji: "✏️",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = getBareNumber(msg.key.fromMe ? sock.user.id : msg.key.participant || from);

      if (!global.owners.includes(sender)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Seul le propriétaire peut changer le préfixe.");
      }

      const newPrefix = args[0];
      if (!newPrefix) return await sendErrorReply(sock, from, msg, sender, "Usage: .setprefix <nouveau_prefix>");

      global.botPrefix = newPrefix; // ⚡ Changement global
      await sendRichReply(sock, from, msg, [msg.key.participant], `✅ Le préfixe global du bot a été changé en : ${newPrefix}`);
    },
  },

  // === ACTIVER / DESACTIVER CLEAN PREFIX GLOBAL ===
  {
    name: "cleanprefix",
    aliases: [],
    emoji: "🧹",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = getBareNumber(msg.key.fromMe ? sock.user.id : msg.key.participant || from);

      if (!global.owners.includes(sender)) {
        return await sendErrorReply(sock, from, msg, sender, "❌ Seul le propriétaire peut changer cette option.");
      }

      const action = args[0]?.toLowerCase();
      if (!["on", "off"].includes(action)) {
        return await sendErrorReply(sock, from, msg, sender, "Usage: .cleanprefix <on|off>");
      }

      global.cleanPrefixEnabled = action === "on"; // ⚡ Changement global
      await sendRichReply(sock, from, msg, [msg.key.participant], `✅ Clean prefix global est maintenant : ${action.toUpperCase()}`);
    },
  },
];

export default botCommands;