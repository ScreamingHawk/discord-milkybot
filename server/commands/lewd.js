const fetch = require('node-fetch')

const log = require('../util/logger')

module.exports = (discord) => {
	// Posts a random lewd
	discord.setCommand(/(?:hentai|lewds?) (\S*)/, msg => {
		if (msg.channel.type !== "dm" && !msg.channel.nsfw) {
			msg.channel.send(`I'm not posting lewds in a SFW channel...`)
			return
		}
		let tags = ''
		if (msg.matches.length > 1){
			tags = `&tags=${msg.matches[1]}`
		}
		log.debug(`Gettings lewd ${tags}`)
		fetch(`http://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=100${tags}`)
				.then(res => res.json())
				.then(items => items.filter(p => p.rating !== "s")) // Only lewd
				.then(items => items[Math.floor(Math.random()*items.length)]) // Pick one at random
				.then(lewd => {
					msg.channel.send(`I hope you like it ${lewd.file_url}`)
				})
				.catch(err => {
					log.error(err)
					msg.channel.send(`Something went wrong... :woman_shrugging:`)
				})
	})
}
