const fetch = require('node-fetch')

const log = require('../util/logger')
const emoji = require('../util/emoji')

module.exports = (discord) => {
	// Posts a random lewd
	discord.addHelp('lewd', "**Request lewds**\n```lewd neko```Only works in NSFW channels or DMs "+ emoji.eggplant)
	discord.setCommand(/(?:hentai|lewds?)\s?(\S*)/i, async msg => {
		if (msg.channel.type !== "dm" && !msg.channel.nsfw) {
			msg.channel.send(`I'm not posting lewds in a SFW channel...`)
			return
		}
		await msg.react(emoji.drool)
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
					msg.reactions.cache.find(r => r.emoji.name === emoji.drool).remove()
					msg.channel.send(lewd.file_url).then(sent => {
						discord.deletableMessage(sent)
					})
				})
				.catch(err => {
					log.error(err)
					msg.reactions.cache.find(r => r.emoji.name === emoji.drool).remove()
					msg.channel.send(`Couldn't find anything... ${emoji.sad}`)
				})
	})
}
