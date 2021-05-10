const express = require("express");
const config = require("./config/index");
const log = require("./lib/log")(module);
const { Botact } = require("botact");

require("dotenv").config();

const app = express();

const hostname = "127.0.0.1";

var port = normalizePort(config.get("port") || "80");
app.set("port", port);

const bot = new Botact({
  token: config.get("token"),
  confirmation: config.get("confirmation"),
});

// Ответ на вопрос который не найден.
bot.on(function (ctx) {
  ctx.reply(
    "Здравствуйте меня зовут Виктор. Задайте свой вопрос и я постараюсь ответить Вам в ближайшее время."
  );
});

// Ответ на конкретный вопрос.
bot.command("Сколько сейчас время", function (ctx) {
  const date = new Date();

  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const time = `Сейчас ${h}:${m}:${s}`;
  ctx.reply(time);
});

app.use(express.json());

app.post("/", bot.listen);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

log.info("Express server listening on port " + port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
