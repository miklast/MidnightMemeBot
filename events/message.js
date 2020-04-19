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
	if (msg.channel.id == "700999076631805972") {
		if (msg.attachments) {
			let meme = msg.attachments.first();
			let mediaURL = meme.url;

  			let targetChannel1 = bot.guilds.get(bot.config.arynServer.server).channels.cache.get(bot.config.arynServer.channel);
    		let targetChannel2 = bot.guilds.get(bot.config.jaredServer.server).channels.cache.get(bot.config.jaredServer.channel);

  			await targetChannel1.send({ files: [mediaURL] });
  			await targetChannel2.send({ files: [mediaURL] });
		} else {
			msg.reply("no attachment!")
		}
	}
}