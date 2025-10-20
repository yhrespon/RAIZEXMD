export const name = "ping";
export const aliases = ["p"];

export async function execute(sock, msg, args) {
  const from = msg.key.remoteJid;

  try {
    const start = Date.now();

    // Message temporaire pour mesurer le ping, avec > *_Pong!_*
    await sock.sendMessage(from, { text: `> *_Pong!_*` });
    const latency = Date.now() - start;

    // Message latency uniquement (libre, sans reply)
    const latencyText = `> *_latency: ${latency} ms_*`;
    await sock.sendMessage(from, { text: latencyText });

    // Réaction emoji 🕷️ au message original (optionnel)
    await sock.sendMessage(from, { react: { text: "🕷️", key: msg.key } });

  } catch (err) {
    console.error("[ping.execute]", err);
    await sock.sendMessage(from, { text: "⚠️ Impossible de calculer la vitesse du bot." });
  }
}