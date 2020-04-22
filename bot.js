const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
require('./funcs.js')(bot);
const readdir = require("fs").readdir;

bot.config = require("./config.json");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.memeCache = new Set();

readdir('./modules/', (err, files) => {
	bot.log(`Loading ${files.length} modules!`);
	files.forEach(f => {
		try {
			var name = require(`./modules/${f}`).name
			bot.commands.set(name, require(`./modules/${f}`));
		} catch (e) {
			bot.log(`Unable to load command ${f}: ${e}`);
		}
	});
	bot.log(`Modules loaded!`);
});

readdir('./events/', (err, files) => {
	bot.log(`Loading ${files.length} events!`);
	files.forEach(file => {
		bot.on(file.split(".")[0], (...args) => {
			require(`./events/${file}`).run(bot, ...args);
		});
	});
	bot.log(`Events loaded!`);
});

//midnight meme timer
let targetChannel1 = bot.guilds.cache.get(bot.config.arynServer.server).channels.cache.get(bot.config.arynServer.channel);
let targetChannel2 = bot.guilds.cache.get(bot.config.jaredServer.server).channels.cache.get(bot.config.jaredServer.channel);
let targetChannel3 = bot.guilds.cache.get(bot.config.mikalServer.server).channels.cache.get(bot.config.mikalServer.channel);

var midnightMeme;
bot.on('ready', () => {
	midnightMeme = bot.channels.cache.get('701002021007917141');
});

const TARGET_HOUR_M = 0;
const TARGET_MINUTE_M = 0;

async function post(memeInput) {
	await targetChannel1.send({ files: [memeInput] });
	await targetChannel2.send({ files: [memeInput] });
	await targetChannel3.send({ files: [memeInput] });
}

setInterval(function () {
	var d1 = new Date();
	if (d1.getMinutes() !== TARGET_MINUTE_M || d1.getHours() !== TARGET_HOUR_M) return;
	bot.memeCache.forEach(post);
	midnightMeme.send("[MIDNIGHT MEME] | Meme(s) successfully distributed!")
}, 60 * 1000);

//restart timer
var restart;
bot.on('ready', () => {
	restart = bot.channels.cache.get('701002021007917141');
});

const TARGET_HOUR_R = 4;
const TARGET_MINUTE_R = 20;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_R || d2.getHours() !== TARGET_HOUR_R) return;
	setTimeout(function () {
		process.exit();
	}, 1000);
	restart.send("[AUTO RESTART] | Process successfully restarted!")
}, 60 * 1000);

bot.login(require("./config.json").token);