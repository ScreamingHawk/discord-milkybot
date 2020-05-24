const log = require('../util/logger')

module.exports = (discord) => {
	// Responds yes
	discord.setCommand(/you (awake|up)/i, msg => {
		msg.channel.send(`Yup`)
	})
	// Echos the text
	discord.setCommand('say', msg => {
		msg.channel.send(`${msg.contentWithoutCommand}`)
	})
	// Replies to greetings
	discord.setCommand(/^(hi|hello|sup|greetings)$/, msg => {
		msg.channel.send(`Hello <@!${msg.author.id}>!`)
	})
	// Echos at someone
	discord.setCommand(/(?:^call )(\S*) (.*)/, msg => {
		let who = msg.matches[1]
		if (who.match(/^me$/i)){
			who = `<@!${msg.author.id}>, you are`
		} else if (who.match(/^you/i) || who.match(/^milky/i) || 
				who.match(new RegExp(`${msg.client.user.id}`)) ||
				who.match(/172630139878768640/)){
			// Some people are immune
			msg.channel.send(`No u`)
			return
		} else {
			who = `${who} is`
		}
		msg.channel.send(`${who} ${msg.matches[2]}`)
	})
}
