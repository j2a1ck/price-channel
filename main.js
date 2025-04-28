import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const channelId = process.env.CHANNEL_ID
const apiUrl = `https://api.nobitex.ir/market/stats`;

const bot = new TelegramBot(token, { polling: true });

async function getJsonFromApi() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

bot.onText(/\/getdata/, async (msg) => {
    const chatId = msg.chat.id;

    const data = await getJsonFromApi();

    if (data) {
        const formattedData = `
        بیت کوین: ${data.stats["btc-usdt"].latest}
        تتر: ${data.stats["usdt-rls"].latest}
        `


        bot.sendMessage(chatId, formattedData);
    } else {
        bot.sendMessage(chatId, 'Sorry, there was an issue fetching the data.');
    }
});




async function sendToChannel() {
    const data = await getJsonFromApi()

    if (data) {
        const template = `
🔵 بیت‌کوین:  {{BTC}} دلار
🔵 تتر: {{USDT}} دلار
`;

        const output = template
            .replace('{{BTC}}', data.stats["btc-usdt"].latest)
            .replace('{{USDT}}', data.stats["usdt-rls"].latest);

        console.log(output);

        bot.sendMessage(channelId, output);
    } else {
        bot.sendMessage(channelId, "Sorry, there was an issue fetching the data.");
    }
}


setInterval(sendToChannel, 3600000); // 1 hour = 3600000 ms
sendToChannel();


export { getJsonFromApi }