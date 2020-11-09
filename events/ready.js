exports.run = async (bot, msg) => {
	bot.config = require('../config.json');

	bot.user.setPresence({ status: 'online', activity: { name: 'on the internet!', type: 0 } });

	bot.log(`${bot.user.username} is online and ready to serve in ${bot.channels.cache.size} channels on ${bot.guilds.cache.size} servers!`);

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
}