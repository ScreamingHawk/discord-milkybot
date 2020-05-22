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
			}))
		}))
	data.channels = data.guilds.map(g => (
			g.channels.filter(c => c.type === "text")
				.map(c => ({key: c.id, value: `${g.name} - ${c.name}`}))
		)).reduce((a, b) => a.concat(b), [])
	socket.emit('data is', data)
}
