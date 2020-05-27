const log = require('../util/logger')

module.exports = (discord) => {
	// Responds yes
	discord.setCommand(/you (awake|up)/i, msg => {
		msg.channel.send(`Yup :wink:`)
	})
	// Echos the text
	discord.setCommand('say', msg => {
		discord.safeDeleteMessage(msg)
		msg.channel.send(`${msg.contentWithoutCommand}`)
	})
	// Replies to greetings
	discord.setCommand(/^(hi|he.lo|sup|greetings)$/, msg => {
		msg.channel.send(`Hello <@!${msg.author.id}>! :wave:`)
	})
	// Politeness breaks commands
	discord.setCommand(/p.ease/i, msg => {
		msg.channel.send(`No need to be polite. I'm just a robot :robot:`)
	})
	// Echos message at someone
	discord.setCommand(/(?:^tell )(\S*) (.*)/i, msg => {
		let who = msg.matches[1]
		if (who.match(/^me$/i)){
			who = `<@!${msg.author.id}>,`
		} else {
			who = `${who},`
		}
		let comment = ` ${msg.matches[2]}`
			// Convert thrid to second person
			.replace(/\ss?he's\s/gi, " you're ")
			.replace(/\ss?he\s/gi, " you ")
			// Convert first to second person
			.replace(/\sI'm\s/gi, " you're ")
			.replace(/\sI\s/gi, " you ")
			.trim()
		discord.safeDeleteMessage(msg)
		msg.channel.send(`${who} ${comment}`)
	})
	// Echos at someone
	discord.setCommand(/(?:^call )(\S*) (.*)/i, msg => {
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
		discord.safeDeleteMessage(msg)
		msg.channel.send(`${who} ${msg.matches[2]}`)
	})
}
