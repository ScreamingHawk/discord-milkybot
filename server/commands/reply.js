const log = require('../util/logger')

module.exports = (discord) => {
	// Set good morning command
	discord.setCommand(/morning/i, msg => {
		msg.channel.send(`Morning <@${msg.author.id}>!`)
	})
	// Replies to "How's it going?"
	discord.setCommand(/how'?s it going/i, { noTagRequired: true }, msg => {
		msg.channel.send(`Good, and you?`)
	})
}
