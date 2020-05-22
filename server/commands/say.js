const log = require('../util/logger')

module.exports = (discord) => {
	// Responds yes
	discord.setCommand(/you awake/i, msg => {
		msg.channel.send(`Yup`)
	})
	// Echos the text
	discord.setCommand('say', msg => {
		msg.channel.send(`${msg.contentWithoutCommand}`)
	})
}
