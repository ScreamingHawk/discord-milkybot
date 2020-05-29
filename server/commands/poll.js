const log = require('../util/logger')
const format = require('../util/format')

const formatQuestion = q => {
	q = format.upperFirst(q.trim())
	if (!q.match(/\?$/)){
		q += '?'
	}
	return q
}

const pollReacts = "1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟".split(' ')

module.exports = (discord) => {
	// Creates a poll
	discord.setCommand(/^poll (.*)/i, msg => {
		let poll = msg.matches[1].trim()
		let pollSplit = poll.split('?')
		if (pollSplit[1]){
			// Check for multiple choice
			let answers = pollSplit[1].split('|')
			if (answers.length < 2){
				answers = pollSplit[1].split(',')
			}
			if (answers.length < 2){
				answers = pollSplit[1].split('/')
			}
			if (answers.length >= 2){
				// Multiple choice
				if (answers.length > 10){
					msg.channel.send("That's way too many options...")
					return
				}
				poll = formatQuestion(pollSplit[0]) +
						answers.map((a, i) => `\n${pollReacts[i]}: ${format.upperFirst(a.trim())}`).join('')
				msg.channel.send("```" + poll + "```by " + msg.author).then(sent => {
					answers.map((_, i) => {
						sent.react(`${pollReacts[i]}`)
					})
					sent.react("🤷‍♀️")
				})
				return
			}
		}
		// Single choice
		discord.safeDeleteMessage(msg)
		msg.channel.send("```" + formatQuestion(poll) + "```by " + msg.author).then(sent => {
			sent.react("👍")
			sent.react("👎")
			sent.react("🤷‍♀️")
		})
	})
}
