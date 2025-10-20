import fs from "fs";
import path from "path";

// Chemins des fichiers
const CONFIG_PATH = "./config.json";
const MODE_FILE = "./mode.json";
const SUDO_FILE = "./sudo.json";

// -------------------
// UTILITY : extraire le numéro depuis un JID
export function getBareNumber(jid) {
    if (!jid) return "";
    const s = String(jid);
    const beforeAt = s.split("@")[0];
    const beforeColon = beforeAt.split(":")[0];
    return beforeColon.replace(/[^0-9]/g, "");
}

// -------------------
// UTILITY : créer un fichier si inexistant
function ensureFile(file, defaultData) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
    }
}

// -------------------
// CONFIG PRINCIPALE
ensureFile(CONFIG_PATH, { users: {} });
let config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

export function getUserConfig(number) {
    return config.users[number] || null;
}

export function setUserConfig(number, data) {
    config.users[number] = { ...(config.users[number] || {}), ...data };
    save();
}

export function save() {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

// -------------------
// MODE GLOBAL
ensureFile(MODE_FILE, { mode: "private" });

export function getMode() {
    const data = JSON.parse(fs.readFileSync(MODE_FILE, "utf-8"));
    return data.mode || "private";
}

export function setMode(newMode) {
    fs.writeFileSync(MODE_FILE, JSON.stringify({ mode: newMode }, null, 2));
}

// -------------------
// SUDO LIST
ensureFile(SUDO_FILE, []);

export function loadSudo() {
    return JSON.parse(fs.readFileSync(SUDO_FILE, "utf-8")) || [];
}

export function saveSudo(list) {
    fs.writeFileSync(SUDO_FILE, JSON.stringify(list, null, 2));
}

// -------------------
// EXPORT DEFAULT
export default {
    config,
    getBareNumber,
    getUserConfig,
    setUserConfig,
    save,
    getMode,
    setMode,
    loadSudo,
    saveSudo
};