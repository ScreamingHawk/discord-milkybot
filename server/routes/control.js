const log = require('../util/logger')

module.exports = {
	init: (_, socket, discord) => {
		socket.on('send message', data => {
			log.debug(JSON.stringify(data))
			const chan = discord.channels.find(c => c.id === data.channel)
			if (chan){
				chan.send(data.message)
			}
		})
	},
}
