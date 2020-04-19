module.exports = {
	name: 'clear',
	permission: 2,
	main: function (bot, msg) {
        bot.memeCache.clear();
        msg.reply("memes cleared!");
	}
}