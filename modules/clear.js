module.exports = {
	name: 'clear',
	permission: 1,
	main: function (bot, msg) {
        bot.memeCache.clear();
        msg.reply("memes cleared!");
	}
}