// commands/utility.js

import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";
import fetch from "node-fetch";

const utilityCommands = [

  // ===== COMMANDE GOOGLE =====
  {
    name: "google",
    description: "Recherche sur Google et renvoie le top résultat",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!args || args.length === 0) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Fournis un terme à rechercher.");
      }

      const query = args.join(" ");
      try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          return await sendErrorReply(sock, from, msg, sender, "❌ Aucun résultat trouvé.");
        }

        const top = data.items[0];
        const teks = `🔎 *Google Result*:\n\n*Title:* ${top.title}\n*Link:* ${top.link}\n*Snippet:* ${top.snippet}`;
        await sendRichReply(sock, from, msg, [sender], teks);

      } catch (err) {
        console.error("Erreur GOOGLE :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de rechercher sur Google.");
      }
    }
  },

  // ===== COMMANDE CALC =====
  {
    name: "calc",
    description: "Calculatrice rapide",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!args || args.length === 0) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Fournis une expression à calculer.");
      }

      const expr = args.join(" ");
      try {
        // ⚠️ eval sécurisé minimal
        const result = Function(`"use strict"; return (${expr})`)();
        await sendRichReply(sock, from, msg, [sender], `🧮 Résultat : ${result}`);
      } catch (err) {
        console.error("Erreur CALC :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Expression invalide.");
      }
    }
  },

  // ===== COMMANDE TRANSLATE =====
  {
  name: "translate",
  description: "Traduit un texte dans la langue ciblée",
  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    if (!args || args.length < 2) {
      return await sock.sendMessage(from, { text: "⚠️ Usage : /translate [langue] [texte]" });
    }

    // Mapping noms de langues → codes ISO
    const languages = {
      anglais: "en",
      french: "fr",
      français: "fr",
      espagnol: "es",
      italien: "it",
      chinois: "zh-CN",
      japonais: "ja",
      allemand: "de",
      arabe: "ar",
      russe: "ru",
      portugais: "pt"
    };

    const targetLang = languages[args[0].toLowerCase()] || args[0];
    const text = args.slice(1).join(" ");

    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await res.json();
      const translated = data.responseData?.translatedText || "❌ Traduction introuvable";

      // Format citation + italique + gras
      const formatted = `> 🌐 Traduction (${targetLang}) :\n> _*${translated}*_`;

      await sock.sendMessage(from, { text: formatted });
    } catch (err) {
      console.error("Erreur TRANSLATE :", err);
      await sock.sendMessage(from, { text: "❌ Impossible de traduire le texte." });
    }
  }
},

  // ===== COMMANDE SHORTLINK =====
  {
    name: "r",
    description: "Raccourcit un lien URL",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);

      if (!args || args.length === 0) {
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Fournis une URL à raccourcir.");
      }

      const url = args[0];
      try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (!data.ok) return await sendErrorReply(sock, from, msg, sender, "❌ Impossible de raccourcir l'URL.");

        const shortUrl = data.result.full_short_link;
        await sendRichReply(sock, from, msg, [sender], `🔗 URL raccourcie : ${shortUrl}`);
      } catch (err) {
        console.error("Erreur SHORTLINK :", err);
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de raccourcir l'URL.");
      }
    }
  }

];

export default utilityCommands;