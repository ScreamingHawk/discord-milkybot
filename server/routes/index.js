const log = require('../util/logger')

module.exports = (io, socket, discord) => {
	log.debug('Loading routes')
	require('./data')(io, socket, discord)
	require('./control')(io, socket, discord)
}
