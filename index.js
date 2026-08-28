const mineflayer = require('mineflayer');

function createBot() {
    console.log("محاولة الاتصال بالسيرفر...");
    
    const bot = mineflayer.createBot({
        host: 'gurnard.aternos.host',
        port: 11025,
        version: false,
        username: 'player_X',
        hideErrors: false
    });

    bot.on('spawn', () => {
        console.log("==> البوت دخل بنجاح واستقر في السيرفر!");
        
        // الانتظار لمدة 5 ثواني بعد الدخول قبل البدء بأي حركة لتجنب الطرد السريع
        setTimeout(() => {
            setInterval(() => {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 1000);
            }, 120000);
        }, 5000);
    });

    bot.on('kicked', (reason) => {
        console.log(`==> تم طرد البوت. السبب: ${reason}`);
    });

    bot.on('end', (reason) => {
        console.log(`==> انقطع الاتصال (${reason}). إعادة المحاولة خلال 10 ثواني...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('==> خطأ في الاتصال:', err.code || err.message);
    });
}

createBot();
