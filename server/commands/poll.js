const log = require('../util/logger')
const format = require('../util/format')
const emoji = require('../util/emoji')

const formatQuestion = q => {
	q = format.upperFirst(q.trim())
	if (!q.match(/\?$/)){
		q += '?'
	}
	return q
}

module.exports = (discord) => {
	// Creates a poll
	discord.addHelp('poll', '**Creates a poll**\n```poll Your question? First answer. Another answer. Another```' +
		'You can separate answers with any of: `|/.,`\nDelete a bad poll with a ' + emoji.poop)
	discord.setCommand(/^poll (.*)/i, msg => {
		let poll = msg.matches[1].trim()
		let pollSplit = poll.split('?')
		if (pollSplit[1]){
			// Check for multiple choice
			let answers = pollSplit[1].split('|')
			if (answers.length < 2){
				answers = pollSplit[1].split('/')
			}
			if (answers.length < 2){
				answers = pollSplit[1].split('.')
			}
			if (answers.length < 2){
				answers = pollSplit[1].split(',')
			}
			if (answers.length >= 2){
				// Multiple choice
				if (answers.length > 10){
					msg.channel.send("That's way too many options...")
					return
				}
				poll = formatQuestion(pollSplit[0]) +
						answers.map((a, i) => `\n${emoji.number(i + 1)}: ${format.upperFirst(a.trim())}`).join('')
				msg.channel.send("```" + poll + "```by " + msg.author).then(sent => {
					discord.deletableMessage(sent)
					answers.map((_, i) => {
						sent.react(`${emoji.number(i + 1)}`)
					})
					sent.react(emoji.shrug)
				})
				return
			}
		}
		// Single choice
		discord.safeDeleteMessage(msg)
		msg.channel.send("```" + formatQuestion(poll) + "```by " + msg.author).then(sent => {
			discord.deletableMessage(sent)
			sent.react(emoji.thumbsUp)
			sent.react(emoji.thumbsDown)
			sent.react(emoji.shrug)
		})
	})
}
