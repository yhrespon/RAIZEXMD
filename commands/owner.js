// commands/owner.js

const ownerCommand = {
  name: "owner",
  description: "Envoie le contact du propriétaire",
  async execute(sock, msg, args, from) {
    try {
      const to = msg.key.remoteJid; // chat destinataire

      const vcard =
        'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN: DEVRAIZEL\n' +
        'ORG: RAIZEL XMD;\n' +
        'TEL;type=CELL;type=VOICE;waid=237657355285:+237657355285\n' +
        'END:VCARD';

      await sock.sendMessage(to, {
        contacts: {
          displayName: "_*RAIZEL XMD*_",
          contacts: [{ vcard }]
        }
      });

      console.log(`[OWNER] vCard envoyée à ${to}`);
    } catch (err) {
      console.error("Erreur lors de l'envoi de la vCard owner :", err);
    }
  }
};

export default ownerCommand;
