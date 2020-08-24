const fetch = require('node-fetch')

const log = require('../util/logger')
const format = require('../util/format')
const emoji = require('../util/emoji')

// const wikipediaSearchApi = "https://en.wikipedia.org/w/rest.php/v1/search/page?limit=1&q="
const wikipediaSummaryApi = "https://en.wikipedia.org/api/rest_v1/page/summary/"

module.exports = discord => {
	// Displays wikipedia summary
	discord.addHelp('wiki', '**Displays Wikipedia Summary**\n```wiki robot```Get smort')
	discord.setCommand(/^wiki\w* (.*)/i, msg => {
		const word = format.upperFirst(msg.matches[1].trim())
		log.debug(`Wikipedia entry for ${word}`)
		fetch(`${wikipediaSummaryApi}${word}`)
				.then(res => res.json())
				.then(json => {
					msg.channel.send(`**${word}**:\n> ${json.extract}\n${json.content_urls.desktop.page}`)
				})
				.catch(err => {
					log.error(err)
					msg.channel.send(`No wikipedia result for "${word}"... ${emoji.shrug}`)
				})
	})
}
