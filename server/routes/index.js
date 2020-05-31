const log = require('../util/logger')

module.exports = (io, socket, discord) => {
	log.debug('Loading routes')
	require('./data').init(io, socket, discord)
	require('./control').init(io, socket, discord)
}
