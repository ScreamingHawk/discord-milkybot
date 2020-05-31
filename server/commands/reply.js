const log = require('../util/logger')

module.exports = (discord) => {
	// Replies to "How's it going?"
	discord.setCommand(/how'?s it going/i, { noTagRequired: true }, msg => {
		msg.channel.send(`Good, and you?`)
	})
}
