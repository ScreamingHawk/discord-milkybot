const log = require('../util/logger')

module.exports = (discord) => {
	// Echos the text
	discord.setCommand('say', msg => {
		msg.channel.send(`${msg.contentWithoutCommand}`)
	})
}
