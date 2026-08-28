const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'AYOUB_andda7man.aternos.me',
        port: 11025,
        version: false,
        username: 'AfnBot_24h'
    });

    bot.on('spawn', () => {
        console.log("البوت دخل بنجاح للسيرفر! راه يخدم دورات.");
        
        // حركة القفز كل دقيقتين باش ما يطردوش نظام الـ AFK
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 1000);
        }, 120000);
    });

    bot.on('end', (reason) => {
        console.log(`انقطع اتصال البوت: ${reason}. إعادة المحاولة بعد 10 ثواني...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('حدث خطأ:', err);
    });
}

createBot();