const discordjs = require('discord.js')
const discord = new discordjs.Client()

const log = require('../util/logger')
const emoji = require('../util/emoji')

const discordToken = process.env.DISCORD_TOKEN

discord.initialise = next => {
	discord.on('ready', () => {
		log.info('Discord login successful!')
		if (next){
			next()
		}
	})
	discord.login(discordToken)
	// Set good morning command
	discord.setCommand('morning', msg => {
		msg.channel.send(`Morning <@${msg.author.id}>!`)
	})
}

// Helper for setting up commands
discord.setCommand = (command, func) => {
	discord.on('message', msg => {
		if (msg.author.id === discord.user.id){
			// Ignore myself
			return
		}
		const isDm = msg.channel.type === "dm"
		// Content without tag
		let c = msg.content
		if (!isDm){
			c = c.replace(new RegExp(`<@${msg.client.user.id}>`), '')
		}
		c = c.trim()
		const firstMention = msg.mentions.users.first()
		// Runs if the first mention is the bot and the command matches (or command is regex already)
		const commandMatcher = command instanceof String ? new RegExp(`^${command.toLowerCase()}`, 'i') : command
		const matches = c.match(commandMatcher)
		if (matches && 
				(isDm || (firstMention && firstMention.id === msg.client.user.id))){
			if (matches.length > 1){
				const [, ...args] = matches
				log.debug(`Running ${command} with "${args.join('", "')}"`)
			} else {
				log.debug(`Running ${command}`)
			}
			// Remove command and add to message
			msg.contentWithoutCommand = c.replace(commandMatcher, '').trim()
			msg.matches = matches
			func(msg)
		}
	})
}

discord.safeDeleteMessage = msg => {
	// Only delete if able
	if (msg.channel.type !== "dm") {
		msg.delete()
	}
}

// Listen for react to delete message
discord.deletableMessage = message => {
	const filter = (reaction, user) => reaction.emoji.name === emoji.poop && user.id !== message.author.id
	message.awaitReactions(filter, { max: 1, time: 60000 })
	.then(() => {
		message.delete()
	})
}

if (!discordToken) {
	// Spam this error to console
	for (let i = 10; i --; ) log.error('NO DISCORD TOKEN!!!')
}

module.exports = discord