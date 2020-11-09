module.exports = {
    name: 'help',
    permission: 1,
    main: function (bot, msg) {
        msg.channel.send({embed: {
            color: 3447003,
            author: {
              name: "Command Guide",
              icon_url: bot.user.avatarURL
            },
            fields: [
                {
                    name: "m!ping",
                    value: "Ping me and measure my response time! Don't worry, I don't bite uwu~"
                },
                {
                    name: "m!uptime",
                    value: "Check my uptime and measure how long it's been since Jared either updated me or I restarted on my own!"
                },
                {
                    name: "m!clear",
                    value: "Clears the cache of any memes set to go out at midnight."
                },
                {
                    name: "m!restart",
                    value: "Restarts the bot."
                }
            ],
            footer: {
              icon_url: msg.guild.iconURL,
              text: msg.guild.name
            }
          }
        });
    }
}