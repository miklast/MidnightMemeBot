const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
require('./funcs.js')(bot);
const readdir = require("fs").readdir;

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