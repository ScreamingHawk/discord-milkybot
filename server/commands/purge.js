const log = require('../util/logger')
const emoji = require('../util/emoji')

module.exports = (discord) => {
	// Purges inactive users from the server
	discord.addHelp('purge <days>', '**Kicks inactive users from the server**\n```purge 30```')
	discord.setCommand(/^purge$/, msg => {
		log.debug("Preparing to purge")
		const messages = [].concat.apply([], msg.guild.channels.cache.filter(c => c.type == 'text').map(c => c.messages.cache))
		const activeUsers = messages.map(m => m.author.username).reduce((acc, u) => acc.add(u), new Set())
		const names = activeUsers.reduce((acc, u) => `${acc}, ${username}`, '')
		msg.channel.send(`Active users: ${names}`)
		// msg.guild.members.fetch().then(members => {
		// 	log.debug("Got list of members")
		// 	const activeUsers = members.map(m => m.user).filter(u => !u.bot && u.lastMessage)
		// 	const names = activeUsers.reduce((acc, u) => `${acc}, ${u.username}`, '')
		// 	msg.channel.send(`Active Users: ${names}`)
		// })
	})
}
