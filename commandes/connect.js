import { startSession } from "../sessionManager.js"; // fichier startSession.js

export const name = "connect";
export const aliases = ["pair", "link"];

// Vérifier si un utilisateur est owner
function isAllowed(senderNum) {
    const allowedUsers = [...(global.owners || [])]; // mettre ici les numéros des owners
    return allowedUsers.includes(senderNum);
}

export async function execute(sock, msg, args, from) {
    try {
        const senderNum = msg.key.fromMe ? sock.user.id.split(":")[0] : (msg.key.participant || from);

        if (!isAllowed(senderNum)) {
            return sock.sendMessage(from, { text: `> _*❌ Tu n'es pas autorisé à utiliser cette commande.*_` });
        }

        let targetNumber;

        // ✅ Si on répond à un message : on récupère l'expéditeur
        if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            targetNumber = msg.message.extendedTextMessage.contextInfo.participant;
        } else {
            // ✅ Sinon on prend le numéro dans les arguments
            targetNumber = args[0];
        }

        if (!targetNumber) {
            return sock.sendMessage(from, {
                text: `> _*❌ Fournis un numéro ou réponds à quelqu’un Exemple: .connect 2376XXXXXXXX*_`
            });
        }

        // Nettoyage du numéro
        targetNumber = targetNumber.replace('@s.whatsapp.net', '').trim();

        await startSession(targetNumber, msg, sock);

    } catch (err) {
        console.error("Erreur connect:", err);
        await sock.sendMessage(from, { text: `> _*❌ Erreur: ${err.message}*_` });
    }
}