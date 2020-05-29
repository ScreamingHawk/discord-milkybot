const fetch = require('node-fetch')
const cheerio = require('cheerio')

const log = require('../util/logger')

module.exports = (discord) => {
	// Check civ server status
	discord.setCommand(/civ.* (up|down)\??$/i, msg => {
		log.debug('Checking if Civ is down...')
		fetch('https://downdetector.com/status/civilization')
				.then(res => res.text())
				.then(text => cheerio.load(text))
				.then(page => page('.entry-title').text().indexOf('No') > -1)
				.then(up => {
					log.debug(`Down Detector says servers are ${up ? 'up' : 'down'}`)
					if (up){
						msg.channel.send('Down Detector says Civ servers are up!!! :tada:')
					} else {
						msg.channel.send('Civilization servers are still having problems... :sob:')
					}
				})
				.catch(err => {
					log.error(err)
					msg.channel.send(`Something went wrong... :woman_shrugging:`)
				})
	})
}
