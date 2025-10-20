import { readJSON, writeJSON } from "../lib/dataManager.js";

const messageCache = {}; // Cache de tous les messages
let ANTIDELETE_ENABLED = false; // Activation globale
const FILE = "antidelete.json";

// Charger le statut depuis fichier si existant
const data = readJSON(FILE);
if (data.enabled !== undefined) ANTIDELETE_ENABLED = data.enabled;

export const name = "antidelete";
export const aliases = ["revoked"];

// ==========================
// ⚙️ Commande principale
// ==========================
export async function execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || jid;
    const targets = [sender];
    const opt = (args[0] || "").toLowerCase();

    if (!["on", "off"].includes(opt)) {
        await sendRichReply(sock, jid, msg, targets, "⚙️ Usage: .antidelete on/off");
        return;
    }

    ANTIDELETE_ENABLED = opt === "on";
    writeJSON(FILE, { enabled: ANTIDELETE_ENABLED });

    await sendRichReply(sock, jid, msg, targets, `✅ AntiDelete global ${ANTIDELETE_ENABLED ? "activé" : "désactivé"}`);
}

// ==========================
// 🧠 Gestion automatique
// ==========================
export function antideleteEvents(sock) {
    // 1️⃣ Stockage des messages entrants
    sock.ev.on("messages.upsert", ({ messages }) => {
        for (const m of messages) {
            if (!m?.message) continue;

            // Ignorer les messages du bot et les forwards
            const senderId = m.key.participant || m.key.remoteJid;
            const botId = sock.user?.id || sock.user?.lid;
            if (botId && senderId.includes(botId.split("@")[0])) continue;
            if (m.messageContextInfo?.isForwarded) continue;

            if (m.message.viewOnceMessage?.message) {
                m.message = m.message.viewOnceMessage.message;
            }

            messageCache[`${m.key.remoteJid}-${m.key.id}`] = m;
        }
    });

    // 2️⃣ Détection des suppressions
    sock.ev.on("messages.update", async (updates) => {
        if (!ANTIDELETE_ENABLED) return;

        for (const update of updates) {
            const isDeleted = update.update?.status === "revoked" || update.update?.messageStubType === 1;
            if (!isDeleted) continue;

            const key = update.key;
            const senderId = key.participant ? key.participant.split("@")[0] : key.remoteJid.split("@")[0];
            const botId = sock.user?.id ? sock.user.id.split("@")[0] : "";
            const botLid = sock.user?.lid ? sock.user.lid.split("@")[0] : "";
            const ownersIds = global.owners?.map(n => n.split("@")[0]) || [];

            if ([botId, botLid, ...ownersIds].includes(senderId)) continue;

            const original = messageCache[`${key.remoteJid}-${key.id}`];
            if (!original) continue;

            const senderBare = original.key.participant
                ? original.key.participant.split("@")[0]
                : key.remoteJid.split("@")[0];

            const targets = [original.key.participant || key.remoteJid];

            try {
                const type = Object.keys(original.message)[0];

                switch (type) {
                    case "conversation":
                    case "extendedTextMessage":
                        const textFallback = original.message.conversation || original.message.extendedTextMessage?.text || "Message supprimé";
                        await sendRichReply(sock, key.remoteJid, original, targets,
                            `🗑️ Message supprimé par @${senderBare} : ${textFallback}`
                        );
                        break;

                    case "imageMessage":
                    case "videoMessage":
                    case "audioMessage":
                    case "stickerMessage":
                    case "documentMessage":
                        // Texte d'alerte
                        await sendRichReply(sock, key.remoteJid, original, targets,
                            `🗑️ Message supprimé par @${senderBare} : (média ${type.replace("Message", "").toLowerCase()})`
                        );
                        // Transfert du média original avec flag isForwarded
                        await sock.sendMessage(key.remoteJid, {
                            forward: original,
                            contextInfo: { isForwarded: true }
                        });
                        break;

                    default:
                        await sendRichReply(sock, key.remoteJid, original, targets,
                            `🗑️ Message supprimé par @${senderBare} (type: ${type})`
                        );
                        break;
                }
            } catch {
                // Ignorer les erreurs
            }

            delete messageCache[`${key.remoteJid}-${key.id}`];
        }
    });
}

// ==========================
// ✨ Fonction de transfert stylé
// ==========================
export async function sendRichReply(sock, from, msg, targets, text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
    await sleep(500);
    const styledText = toQuoteItalic(`*${text}*`);
    const thumbnail = await fetchThumbnail("https://files.catbox.moe/aanan8.jpg");

    await sock.sendMessage(from, {
        text: styledText,
        mentions: targets,
        contextInfo: {
            mentionedJid: targets,
            externalAdReply: thumbnail ? {
                showAdAttribution: false,
                renderLargerThumbnail: true,
                title: `RAIZEL XMD`,
                body: `RAIZEL`,
                previewType: "PHOTO",
                thumbnail,
                sourceUrl: link
            } : undefined,
            isForwarded: true,
            forwardingScore: 99999
        }
    }, { quoted: msg });

    await sleep(500);
}

// ==========================
// ✨ Fonctions utilitaires intégrées
// ==========================
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toQuoteItalic(text) {
    return `_${text}_`;
}

async function fetchThumbnail(url) {
    try {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        return Buffer.from(buffer);
    } catch {
        return null;
    }
}