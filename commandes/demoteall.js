import { getBareNumber, normalizeJid, loadSudo } from "../index.js";
import fs from "fs";

// --- Utilitaires pour le message enrichi ---
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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

// --- Envoi d'un message enrichi avec reply et mentions (citation + italique) ---
async function sendRichReply(sock, from, msg, targets, text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
    await sleep(500);
    const styledText = toQuoteItalic(text);
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
            isForwarded: false,
            forwardingScore: 99999
        }
    }, { quoted: msg });
    await sleep(500);
}

// --- Envoi d'un message normal (sans italique ni citation) ---
async function sendPlainReply(sock, from, msg, targets = [], text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
    const thumbnail = await fetchThumbnail("https://files.catbox.moe/aanan8.jpg");

    await sock.sendMessage(from, {
        text,
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
            isForwarded: false,
            forwardingScore: 99999
        }
    });
}

// --- Commande demoteall ---
export const name = "demoteall";
export const description = "Rétrograde tous les admins sauf le bot, owners et sudo";

export async function execute(sock, msg) {
    const from = msg.key.remoteJid;
    const senderJid = msg.key.fromMe ? sock.user.id : (msg.key.participant || from);
    const senderNum = getBareNumber(senderJid);

    // Vérifie si l'expéditeur est autorisé
    const allowed = [...(global.owners || []), ...loadSudo().map(n => String(n).replace(/[^0-9]/g, ""))];
    if (!allowed.includes(senderNum)) {
        return await sendPlainReply(sock, from, msg, [senderJid], "❌ Vous n'êtes pas autorisé à utiliser cette commande.");
    }

    try {
        const groupMeta = await sock.groupMetadata(from);
        const participants = groupMeta.participants;

        const botJid = sock.user.id.split(":")[0] + "@s.whatsapp.net";
        const sudoList = loadSudo();

        const toDemote = participants
            .filter(p => p.admin && p.id !== botJid && !sudoList.includes(p.id) && !global.owners.includes(getBareNumber(p.id)))
            .map(p => p.id);

        if (toDemote.length === 0) {
            return await sendPlainReply(sock, from, msg, [senderJid], "⚠️ Aucun admin à rétrograder.");
        }

        // Exécuter le demote
        await sock.groupParticipantsUpdate(from, toDemote, "demote");

        // Réagir au message pour signaler l'action
        await sock.sendMessage(from, { react: { text: "🔽", key: msg.key } });

        // Message de confirmation avec mentions
        await sendRichReply(
            sock,
            from,
            msg,
            toDemote,
            `🔽 ${toDemote.length} admins non protégés ont été rétrogradés.`
        );

    } catch (err) {
        console.error("Erreur demoteall:", err);
        await sendPlainReply(sock, from, msg, [senderJid], "❌ Impossible de rétrograder les admins : " + err.message);
    }
}