const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'gurnard.aternos.host', // الـ الـدينا‌ميكي الخاص بسيرفرك
        port: 11025,                  // البورت الصحيح
        version: false,               // اكتشاف النسخة أوتوماتيكياً
        username: 'player_X'          // اسم البوت الطبيعي 100%
    });

    bot.on('spawn', () => {
        console.log("==> البوت 'player_X' دخل بنجاح واستقر في السيرفر!");
        
        // حركة القفز كل دقيقتين لمنع طرده بسبب الخمول (AFK Timeout)
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 1000);
        }, 120000);
    });

    // التقاط سبب الطرد بدقة لمعرفته في الـ Logs
    bot.on('kicked', (reason) => {
        console.log(`==> تم طرد البوت من السيرفر. السبب: ${reason}`);
    });

    bot.on('end', (reason) => {
        console.log(`==> انقطع اتصال البوت. السبب: ${reason}. إعادة المحاولة بعد 15 ثانية...`);
        setTimeout(createBot, 15000); // زيادة الوقت قليلاً لضمان استقرار السيرفر
    });

    bot.on('error', (err) => {
        console.log('==> حدث خطأ في اتصال البوت:', err);
    });
}

createBot();
