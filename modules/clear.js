module.exports = {
	name: 'ping',
	permission: 1,
	main: function (bot, msg) {
        bot.memeCache.clear();
        msg.reply("memes cleared!");
	}
}