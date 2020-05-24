const log = require('../util/logger')

module.exports = (io, socket, discord) => {
	log.debug('Sending discord data')
	const data = {}
	data.guilds = discord.guilds.map(g => ({
			id: g.id,
			name: g.name,
			channels: g.channels.map(c => ({
				id: c.id,
				name: c.name,
				type: c.type,
			})),
			users: g.members.map(m => ({
				id: m.user.id,
				username: m.user.username,
				bot: m.user.bot,
			})),
		}))
	data.channels = data.guilds.map(g => (
			g.channels.filter(c => c.type === "text")
				.map(c => ({key: c.id, value: `${g.name} - ${c.name}`}))
		)).reduce((a, b) => a.concat(b), [])
	data.users = discord.users.filter(u => !u.bot)
			.map(u => ({
				key: u.id,
				value: u.username,
			}))
	socket.emit('data is', data)
}
