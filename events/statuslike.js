export default async function statusLike(sock, update, emoji = "💚") {
  try {
    for (const status of update) {
      if (status.key && status.key.remoteJid === "status@broadcast" && status.message) {
        await sock.sendMessage(status.key.participant, {
          react: {
            text: emoji, 
            key: status.key,
          },
        });
      }
    }
  } catch (error) {
    console.error("❌ Erreur statusLike:", error.message);
  }
}
