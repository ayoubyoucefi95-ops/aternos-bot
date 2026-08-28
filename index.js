const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'AYOUB_andda7man.aternos.me',
        port: 11025,
        version: false,
        username: 'player_X'
    });

    bot.once('spawn', () => {
        console.log('البوت دخل بنجاح واستقر في السيرفر 🎉');

        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => { bot.setControlState('jump', false); }, 500);

            const yaw = bot.entity.yaw + 2;
            const pitch = (Math.random() - 0.5) * 0.5;
            bot.look(yaw, pitch, true);
        }, 15000);
    });

    bot.on('end', (reason) => {
        console.log(`انقطع الاتصال البوت: ${reason}. إعادة المحاولة بعد 5 ثواني...`);
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('حدث خطأ:', err);
    });
}

createBot();
