// Willie’s WhatsApp Bot (Termux optimized)
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// LocalAuth automatically saves your session
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true } // headless mode for Termux
});

// Display QR code for first login only
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code with WhatsApp to link the bot!');
});

// Bot is ready
client.on('ready', () => {
    console.log('🎉 Willie\'s Bot is ready and running!');
});

// Auto-reconnect logic
client.on('disconnected', reason => {
    console.log('⚠️ Bot disconnected:', reason);
    console.log('Attempting to reconnect...');
    client.initialize();
});

// Example commands
client.on('message', message => {
    const msg = message.body.toLowerCase();

    if(msg === 'hi') {
        message.reply('Hello! I am Willie\'s Bot 🤖');
    } else if(msg === 'help') {
        message.reply('Send "hi" to test me!');
    } else if(msg === 'ping') {
        message.reply('Pong!');
    }
});

// Start the bot
client.initialize();
