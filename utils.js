import fs from "fs";
import axios from "axios";

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function getBareNumber(input) {
    if (!input) return "";
    const s = String(input);
    const beforeAt = s.split("@")[0];
    const beforeColon = beforeAt.split(":")[0];
    return beforeColon.replace(/[^0-9]/g, "");
}

export function normalizeJid(jid) {
    if (!jid) return null;
    return jid.split(":")[0].replace("@lid", "@s.whatsapp.net");
}

export function readJSON(filePath, defaultValue = {}) {
    if (!fs.existsSync(filePath)) return defaultValue;
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

export function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getUserConfig(number, configPath = "./config.json") {
    const cfg = readJSON(configPath, { users: {} });
    return cfg.users[number] || null;
}

export function setUserConfig(number, data, configPath = "./config.json") {
    const cfg = readJSON(configPath, { users: {} });
    cfg.users[number] = { ...(cfg.users[number] || {}), ...data };
    writeJSON(configPath, cfg);
}

// Transforme texte pour citation + italique
export function toQuoteItalic(text) {
    return `> _${text}_`;
}

// Fonction pour récupérer un buffer d'image depuis URL
async function fetchThumbnail(url) {
    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        return Buffer.from(response.data);
    } catch (err) {
        console.error("❌ Impossible de charger la miniature :", err);
        return null;
    }
}

// --- Envoi d'un message enrichi avec reply et mentions (citation + italique) ---
export async function sendRichReply(sock, from, msg, targets, text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
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
export async function sendPlainReply(sock, from, msg, targets = [], text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
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

// --- Envoi d'un message d'erreur avec reply et mention de l'auteur ---
export async function sendErrorReply(sock, from, msg, sender, text, link = "https://whatsapp.com/channel/0029Vb0rK4JHAdNbbiG5lt2x") {
    await sleep(200);
    const styledText = toQuoteItalic(text);

    const thumbnail = await fetchThumbnail("https://files.catbox.moe/aanan8.jpg");

    await sock.sendMessage(from, {
        text: styledText,
        mentions: [sender],
        contextInfo: {
            mentionedJid: [sender],
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
        }
    }, { quoted: msg });

    await sleep(200);
}