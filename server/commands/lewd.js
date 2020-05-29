const fetch = require('node-fetch')

const log = require('../util/logger')
const emoji = require('../util/emoji')

let turnedOn = false

module.exports = (discord) => {
	// Enables these commands
	discord.setCommand(/^turn.* on.*$/i, msg => {
		turnedOn = true
		msg.react(emoji.eggplant)
	})
	// Disables these commands
	discord.setCommand(/^turn.* off.*$/i, msg => {
		turnedOn = false
		msg.react(emoji.relief)
	})
	// Posts a random lewd
	discord.setCommand(/(?:hentai|lewds?)\s?(\S*)/i, msg => {
		if (!turnedOn){
			msg.channel.send("I'm not ready...")
			return
		}
		if (msg.channel.type !== "dm" && !msg.channel.nsfw) {
			msg.channel.send(`I'm not posting lewds in a SFW channel...`)
			return
		}
		msg.react(emoji.drool)
		let tags = ''
		if (msg.matches.length > 1 && msg.matches[1]){
			tags = `&tags=${msg.matches[1]}`
		}
		log.debug(`Gettings lewd ${tags}`)
		fetch(`http://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=100${tags}`)
				.then(res => res.json())
				.then(items => items.filter(p => p.rating !== "s")) // Only lewd
				.then(items => items[Math.floor(Math.random()*items.length)]) // Pick one at random
				.then(lewd => {
					msg.channel.send(lewd.file_url)
				})
				.catch(err => {
					log.error(err)
					msg.channel.send(`Something went wrong... ${emoji.shrug}`)
				})
	})
}
