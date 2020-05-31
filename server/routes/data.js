const prune = require('json-prune')

const log = require('../util/logger')

let allSockets

module.exports = {
	init: (io, socket, discord) => {
		allSockets = io
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
		data.users = discord.users.filter(u => !u.bot)
				.map(u => ({
					key: u.id,
					value: u.username,
				}))
		socket.emit('data is', JSON.parse(prune(data)))
	},
	sendData: data => allSockets.emit('data is', JSON.parse(prune(data)))
}
