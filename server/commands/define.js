const fetch = require('node-fetch')

const log = require('../util/logger')
const format = require('../util/format')
const emoji = require('../util/emoji')

const dictionaryApiKey = process.env.DICTIONARYAPI_KEY
const dictionaryApiUrl = "https://dictionaryapi.com/api/v3/references/collegiate/json/"

module.exports = (discord) => {
	if (!dictionaryApiKey){
		log.warn("No dictionary api key. Skipping dictionary route...")
		return
	}
	// Defines a word
	discord.addHelp('define', '**Defines a word**\n```define egregious```Maximize eloquence')
	discord.setCommand(/^define (.*)/i, msg => {
		const word = format.upperFirst(msg.matches[1].trim())
		log.debug(`Defining ${word}`)
		fetch(`${dictionaryApiUrl}${word}?key=${dictionaryApiKey}`)
				.then(res => res.json())
				.then(json => '> ' + json[0].shortdef.join('\n> '))
				.then(def => {
					msg.channel.send(`${word}:\n${def}`)
				})
				.catch(err => {
					log.error(err)
					msg.channel.send(`I don't know "${word}"... ${emoji.shrug}`)
				})
	})
}
