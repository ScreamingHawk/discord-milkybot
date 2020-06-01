const log = require('../util/logger')

module.exports = (discord) => {
	// Responds yes
	discord.setCommand(/you (awake|up)/i, msg => {
		msg.channel.send(`Yup ${emoji.wink}`)
	})
	// Replies to greetings
	discord.setCommand(/^(hi|he.lo|sup|greetings)$/i, msg => {
		msg.channel.send(`Hello <@!${msg.author.id}>! ${emoji.wave}`)
	})
	// Set good morning command
	discord.setCommand(/morning/i, msg => {
		msg.channel.send(`Morning <@${msg.author.id}>!`)
	})
	// Replies to "How's it going?"
	discord.setCommand(/how'?s it going/i, { noTagRequired: true }, msg => {
		msg.channel.send(`Good, and you?`)
	})
	// Politeness breaks commands
	discord.addHelp('please', "**Check your privilege**\n```please```\nYou don't need manners when talking to robots... " + emoji.robot)
	discord.setCommand(/p.ease/i, msg => {
		msg.channel.send(`No need to be polite. I'm just a robot ${emoji.robot}`)
	})
}
