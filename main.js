const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables from a .env file

// Your bot token from BotFather, stored in an environment variable
const token = process.env.TELEGRAM_BOT_TOKEN;

// API URL with the API key loaded from environment variables
const apiUrl = `http://api.navasan.tech/latest/?api_key=${process.env.API_KEY}`;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to fetch JSON from API
async function getJsonFromApi() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

// Listen for a message from the user
bot.onText(/\/getdata/, async (msg) => {
    const chatId = msg.chat.id;

    // Fetch the JSON data from the API
    const data = await getJsonFromApi();

    // If data is found, send it to the user
    if (data) {
        // If the data contains relevant information, format it nicely
        const formattedData = `
        Data from API:
        - Name: ${data.name || 'N/A'}
        - Description: ${data.description || 'No description available'}
        - Other info: ${JSON.stringify(data.otherInfo || 'No additional info')}`;

        bot.sendMessage(chatId, formattedData);
    } else {
        bot.sendMessage(chatId, 'Sorry, there was an issue fetching the data.');
    }
});
