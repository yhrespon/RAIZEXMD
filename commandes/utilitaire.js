import fs from "fs";
import path from "path";
import axios from "axios";
import { getDevice } from "@whiskeysockets/baileys";
import { getBareNumber, sendRichReply, sendErrorReply } from "../utils.js";

export const utilitaireCommands = [
  // 📱 DEVICE
  {
    name: "device",
    description: "Révèle l’appareil utilisé par un utilisateur (reply obligatoire)",
    emoji: "📱",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const emoji = "📱";

      try {
        const ctx = msg.message?.extendedTextMessage?.contextInfo;
        if (!ctx?.stanzaId || !ctx?.participant) {
          await sock.sendMessage(from, { react: { text: "⚠️", key: msg.key } });
          return await sendErrorReply(sock, from, msg, sender, "⚠️ Réponds à un message pour sonder l’appareil.");
        }

        const stanzaId = ctx.stanzaId;
        const participant = ctx.participant;

        let device = "Inconnu";
        try {
          const result = getDevice(stanzaId);
          if (result) device = result;
        } catch {}

        const targetNumber = participant?.split("@")[0] || "inconnu";
        const text = `${emoji} *Appareil détecté*_\n> _Utilisateur : ${targetNumber}_\n> _Appareil : ${device}`;

        await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
        await sendRichReply(sock, from, msg, [participant], text);
      } catch (err) {
        await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de détecter l’appareil : " + err.message);
      }
    },
  },

  // 💻 INFO ZAP
  {
    name: "infozap",
    description: "Indique si l’utilisateur utilise WhatsApp Messenger ou Business",
    emoji: "💻",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || getBareNumber(msg.key.participant);
      const emoji = "💻";

      try {
        let targetJid = null;
        let targetName = "";

        const quoted = msg.message?.extendedTextMessage?.contextInfo;

        if (quoted?.participant) {
          targetJid = quoted.participant;
        } else if (msg.mentionedJid?.length) {
          targetJid = msg.mentionedJid[0];
        } else if (args.length) {
          const a = args[0];
          targetJid = a.includes("@") ? a : `${a}@s.whatsapp.net`;
        } else {
          targetJid = msg.key.participant || from;
        }

        targetName = targetJid.split("@")[0];

        let isBusiness = false;

        try {
          if (typeof sock.onWhatsApp === "function") {
            const res = await sock.onWhatsApp([targetJid]);
            const info = Array.isArray(res) ? res[0] : res;
            if (info?.isBusiness) isBusiness = true;
          }
        } catch {}

        try {
          const contact = sock.store?.contacts?.get
            ? sock.store.contacts.get(targetJid)
            : sock.store?.contacts?.[targetJid];
          if (contact?.isBusiness || contact?.verifiedName || contact?.businessProfile) isBusiness = true;
        } catch {}

        try {
          if (!isBusiness && typeof sock.getBusinessProfile === "function") {
            const bp = await sock.getBusinessProfile(targetJid).catch(() => null);
            if (bp) isBusiness = true;
          }
        } catch {}

        const waType = isBusiness ? "WhatsApp Business" : "WhatsApp Messenger";
        const text = `${emoji} *Type WhatsApp*_\n> _Utilisateur : ${targetName}_\n> _Type : ${waType}`;

        await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
        await sendRichReply(sock, from, msg, [targetJid], text);
      } catch (err) {
        await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de détecter le type de WhatsApp : " + err.message);
      }
    },
  },

  // 📰 NEWS
  {
    name: "news",
    description: "Affiche les dernières actualités",
    emoji: "📰",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || msg.key.participant;
      const emoji = "📰";

      try {
        const apiKey = "dcd720a6f1914e2d9dba9790c188c08c"; // NewsAPI
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles.slice(0, 5);

        let text = `${emoji} *Dernières actualités*_ \n\n`;
        articles.forEach((a, i) => {
          text += `> _${i + 1}. ${a.title}_\n> _${a.description || "Pas de description"}_\n\n`;
        });

        await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
        await sendRichReply(sock, from, msg, [msg.key.participant], text);
      } catch (err) {
        await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de récupérer les actualités : " + err.message);
      }
    },
  },

  // ☀️ WEATHER
  {
    name: "weather",
    description: "Affiche la météo d'une ville",
    emoji: "☀️",
    async execute(sock, msg, args) {
      const from = msg.key.remoteJid;
      const sender = msg.pushName || msg.key.participant;
      const emoji = "☀️";
      const city = args.join(" ");

      if (!city)
        return await sendErrorReply(sock, from, msg, sender, "⚠️ Fournis le nom de la ville : *.weather Ville*");

      try {
        const apiKey = "4902c0f2550f58298ad4146a92b65e10"; // OpenWeather API
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`
        );
        const weather = response.data;

        const text = `${emoji} *Météo à ${weather.name}*_\n> _🌑 Condition : ${weather.weather[0].description}_\n> _🌡️ Température : ${weather.main.temp}°C_\n> _💨 Vent : ${weather.wind.speed} m/s_\n> _💧 Humidité : ${weather.main.humidity}%`;

        await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
        await sendRichReply(sock, from, msg, [msg.key.participant], text);
      } catch (err) {
        await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
        await sendErrorReply(sock, from, msg, sender, "❌ Impossible de récupérer la météo : " + err.message);
      }
    },
  },
];

export default utilitaireCommands;