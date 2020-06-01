const log = require('../util/logger')
const emoji = require('../util/emoji')

module.exports = (discord) => {
	// Echos the text
	discord.addHelp('say', '**Make me say something**\n```say Hello! ' + emoji.wave + '```')
	discord.setCommand(/^say (.*)/i, msg => {
		discord.safeDeleteMessage(msg)
		msg.channel.send(`${msg.match[1]}`)
	})
	// Echos message at someone
	discord.addHelp('tell', "**Make me talk to someone**\n```tell Gecko he's gay```He is tho")
	discord.setCommand(/^tell (\S*) (.*)/i, msg => {
		let who = msg.matches[1]
		if (who.match(/^me$/i)){
			who = `<@!${msg.author.id}>,`
		} else {
			who = `${who},`
		}
		let comment = ` ${msg.matches[2]}`
			// Convert thrid to second person
			.replace(/\s\S?he'?s\s/gi, " you're ")
			.replace(/\s\S?he\s/gi, " you ")
			// Convert first to second person
			.replace(/\sI'?m\s/gi, " you're ")
			.replace(/\sI\s/gi, " you ")
			.trim()
		discord.safeDeleteMessage(msg)
		msg.channel.send(`${who} ${comment}`)
	})
	// Echos at someone
	discord.addHelp('call', "**Make me call someone names**\n```call Gecko gay```Coz he is")
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
