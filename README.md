**README for Telegram Bot – Nobitex Market Stats**

---

# 📊 Telegram Bot for Nobitex Market Stats

This is a simple Node.js Telegram bot that fetches the latest **Bitcoin (BTC)** and **Tether (USDT)** prices from the [Nobitex API](https://api.nobitex.ir/market/stats) and sends them to:

* Users on demand via `/getdata` command
* A specific Telegram channel every hour automatically

---

## 📦 Features

* Fetches real-time prices from Nobitex
* Responds to `/getdata` command with the current BTC and USDT values
* Sends hourly price updates to a Telegram channel
* Error handling for API and network issues

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/j2a1ck/price-channel.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root of the project:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
CHANNEL_ID=@your_channel_username_or_channel_id
```

> Make sure the bot is an admin in the channel you want to post to.

---

## ▶️ Run the Bot

```bash
npm run dev
```

This will:

* Start polling for messages
* Immediately post the current prices to the channel
* Continue posting updates every hour

---

## 🛠 Project Structure

* `main.js` – Main bot logic
* `.env` – Environment variables
* Uses:

  * `node-telegram-bot-api`
  * `node-fetch`
  * `dotenv`

---

## 📬 Example Output

### In Response to `/getdata`

```
بیت کوین: 12345.67
تتر: 58000
```

### In Channel Every Hour

```
🔵 بیت‌کوین: 12345.67 دلار
🔵 تتر: 58000 تومان
```

---

## 📄 License

MIT – Feel free to use and modify.

---
