exports.run = async (bot, msg) => {
	if (msg.channel.type === "dm" && msg.author.id == bot.user.id) {
		console.log("[DM] " + bot.user.username + " -> " + msg.channel.recipient.username + " | " + msg.content)
		bot.channels.fetch(bot.config.logChannel).send(`The message: "${msg.content || "(no content)"}" by **${msg.author.tag}** was sent to me by another bot (or myself)!`)
	} else if (msg.channel.type === "dm" && msg.author.id != bot.user.id) {
		console.log("[DM] " + msg.channel.recipient.username + " -> " + bot.user.username + " | " + msg.content)
		bot.channels.fetch(bot.config.logChannel).send(`The message: "${msg.content || "(no content)"}" by **${msg.author.tag}** was sent to me!`)
	}

	if (!msg.channel.type === "text" || !msg.guild || msg.author.bot) return;

	bot.processMessage(msg);

	//reply array shenanigans
	const responseObject = {
		"input": "output"
	};
	if (responseObject[msg.content.toLowerCase()]) {
		msg.channel.send(responseObject[msg.content.toLowerCase()]);
	}

	const msg1 = msg.content.toLowerCase();
	if (msg1.includes("input")) {
		msg.channel.send("output");
	}
	//for banned words
	if (msg1.includes("input")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}

	//meme reposts
	if (msg.channel.id == "--") {
		if (msg.attachments) {
			//pull media link
			var mediaURL = messageAttachment.proxyURL;

			//get target servers
			var targetServer1 = bot.config.arynServer.server;
			var targetServer2 = bot.config.jaredServer.server;

			//get target channels
			var targetChannel1 = targetServer1.channels.cache.get(bot.config.arynServer.channel);
			var targetChannel2 = targetServer2.channels.cache.get(bot.config.jaredServer.channel);

			//send
			targetChannel1.send(mediaURL);
			targetChannel2.send(mediaURL);
		}
	}
}