require('./settings')
const { default: yudamodsConnect, useSingleFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } = require('@adiwajshing/baileys')
const { state } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const fs = require('fs')
const readline = require("readline");
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const yudamodsCases = require('./yudamods')
const chalk = require('chalk')
const figlet = require('figlet')

// Importing helper functions and data
const { color, smsg, getTextSetWelcome, getTextSetLeft, isSetWelcome, isSetLeft } = require('./lib/functions')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')

// Global variables
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'))
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
const db = JSON.parse(fs.readFileSync('./database/database.json'))

let store = makeInMemoryStore()

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};

const startyudamods = async () => {
    let { version, isLatest } = await fetchLatestBaileysVersion()
    const yudamods = yudamodsConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        version
    })

    store.bind(yudamods.ev)

    console.log(chalk.rgb(255, 0, 0)(figlet.textSync('YudaMods', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));

    if (!yudamods.authState.creds.registered) {
        const phoneNumber = await question(color('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n', 'magenta'));
        const code = await yudamods.requestPairingCode(phoneNumber.trim())
        console.log(color(`⚠︎ Kode Pairing Bot Whatsapp kamu :`,"gold"), color(`${code}`, "white"))
    }

    yudamods.ev.on('messages.upsert', async chatUpdate => {
        try {
            m = chatUpdate.messages[0]
            if (!m.message) return
            m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
            if (m.key && m.key.remoteJid === 'status@broadcast') return
            if (!yudamods.public && !m.key.fromMe && chatUpdate.type === 'notify') return
            if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
            m = smsg(yudamods, m, store)
            yudamodsCases(yudamods, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    });

    // Event listeners and other code...
};

startyudamods();

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
    delete require.cache[file]
    require(file)
})
