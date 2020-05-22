const log = require('../util/logger')

module.exports = (io, socket, discord) => {
	log.debug('Sending discord data')
	const data = {
		guilds: discord.guilds.map(g => ({
			id: g.id,
			name: g.name,
			channels: g.channels.map(c => ({
				id: c.id,
				name: c.name,
			}))
		}))
	}
	socket.emit('data is', data)
}
