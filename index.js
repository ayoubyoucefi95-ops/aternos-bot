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

        // حركة تفاعلية كل 30 ثانية (قفزة + دوران خفيف للرأس باش ما يطردوش السيرفر)
        setInterval(() => {
            // القفز
            bot.setControlState('jump', true);
            setTimeout(() => { bot.setControlState('jump', false); }, 1000);

            // دوران عشوائي خفيف للرأس
            const yaw = bot.entity.yaw + 1.5;
            const pitch = (Math.random() - 0.5) * 0.5;
            bot.look(yaw, pitch, true);

        }, 30000);
    });

    bot.on('end', (reason) => {
        console.log(`انقطع الاتصال البوت: ${reason}. إعادة المحاولة بعد 10 ثانية...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('حدث خطأ:', err);
    });
}

createBot();
