const log = require('../util/logger')

module.exports = discord => {
	log.debug('Loading discord commands')
	require("./say.js")(discord)
}
