const fs = require('fs')
const chalk = require('chalk')

global.domain = "https://dyllnesia.panellkuu.com"
global.apikey = 'ptla_riSXnA6Zz5p6fPY4YlLQELxksTKQZBzFMBDIfLlKbXs'
global.capikey = 'ptla_riSXnA6Zz5p6fPY4YlLQELxksTKQZBzFMBDIfLlKbXs'
global.aipikey = 'ptla_riSXnA6Zz5p6fPY4YlLQELxksTKQZBzFMBDIfLlKbXs'
global.creAtor = "6283842204546@s.whatsapp.net"
global.owner = ['6283842204546']
global.ownerNumber = ["6283842204546@s.whatsapp.net"]
global.nomerOwner = "6283842204546"
global.namabotnya = 'YUDAMODS BOT'
global.namaownernya = 'YUDAMODS'
global.packname = '© YUDAMODS||+6283842204546🇲🇨\nI`m From Indonesia'
global.author = 'Wa : 6283842204546\nIG : yudamods'
global.sessionName = 'session'
global.email = 'yudamodsvip@gmail.com'
global.group = 'https://chat.whatsapp.com/KoF5ERpT4Bt53RAHXLEuF7'
global.youtube = 'https://www.youtube.com/@YUDAMODS'
global.website = 'https://yudamods.github.io'
global.github = 'https://github.com/YUDAMODS'
global.nomorowner = 'https://wa.me/6283842204546'
global.region = 'I`m From Indonesia'
global.prefa = ['','!','.','#','-','•']
global.anticall = true
global.wm = "Subscribe YT *YUDAMODS*"
global.mess = {
    success: '```Success✅```',
    admin: '```Fitur Khusus Admin Group!!!```',
    botAdmin: '```Bot Harus Menjadi Admin Terlebih Dahulu!!!```',
    owner: '```Fitur Khusus Owner Bot!!!```',
    group: '```Fitur Digunakan Hanya Untuk Group!!!```',
    private: '```Fitur Digunakan Hanya Untuk Private Chat!!!```',
    banned: '*Kamu Telah Dibanned Untuk Menggunakan Bot Ini Untuk Membuka Banned Chat Owner .Owner*',
    bot: '```Fitur Khusus Pengguna Nomor Bot!!!```',
    premium: 'Maaf Sebelumya Kamu Belum Premium, Silahkan Chat Owner Untuk Beli Premium Ketik .Owner',
    error: '```Mungkin Lagi Error Kak Harap Lapor Owner Biar Langsung Di Benerin🙏```',
    wait: '```Waittt...```'
}

global.thumb = fs.readFileSync('./image/thumb.png')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
    delete require.cache[file]
    require(file)
})
