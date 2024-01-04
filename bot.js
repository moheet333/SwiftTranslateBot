const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const { translate } = require("free-translate");

const bot = new telegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    bot.sendMessage(
      chatId,
      "<strong>Instructions to use the bot</strong>\n1) <u>Forward a Message</u>:\nForward any message in a language you don't understand without any attached text.\n2) <u>Get Translation</u>:\nInstantly receive the translated message in English.\n3) <u>Easy Communication</u>:\nEffortlessly bridge language gaps in your Telegram conversations! 🌐✨",
      { parse_mode: "HTML" }
    );
    return;
  }
  await translate(messageText, { to: "en" })
    .then((res) => {
      bot.sendMessage(chatId, res);
    })
    .catch((error) => {
      bot.sendMessage(chatId, "Internal Server Error");
    });
});
