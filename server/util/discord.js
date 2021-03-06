const discordjs = require('discord.js')
const discord = new discordjs.Client()

const log = require('../util/logger')
const emoji = require('../util/emoji')

const dataRoute = require('../routes/data')

const discordToken = process.env.DISCORD_TOKEN

let commands = []
const helpCommands = {}

discord.initialise = next => {
	discord.on('ready', () => {
		log.info('Discord login successful!')
		if (next){
			next()
		}
	})
	discord.login(discordToken)
	// Help commands
	discord.setCommand(/^help ?(.*)/i, msg => {
		let help = helpCommands[msg.matches[1]]
		if (!help){
			help = "Here's what I can do: `" + Object.keys(helpCommands).join('`, `') +
					"`\nType `help <command>` for more information"
		}
		msg.channel.send(help)
	})

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
		const messageToBot = isDm || (firstMention && firstMention.id === msg.client.user.id)
		for (let command of commands){
			const matches = c.match(command.command)
			if (matches && (messageToBot || command.options.noTagRequired)){
				if (matches.length > 1){
					const [, ...args] = matches
					log.debug(`Running ${command.command} with "${args.join('", "')}"`)
				} else {
					log.debug(`Running ${command.command}`)
				}
				// Add matches for callback
				msg.matches = matches
				command.func(msg)
				// Send command to the client
				dataRoute.sendData(msg)
			}
		}
	})
}

discord.addHelp = (command, message) => {
	helpCommands[command] = message
}

// Helper for setting up commands
discord.setCommand = (command, options, func) => {
	if (func === undefined){
		// No options supplied. Default them
		func = options
		options = {
			noTagRequired: false,
		}
	}
	log.debug(`Added command ${command}`)
	commands.push({command, options, func})
}

// Helper for removing commands
discord.removeCommand = command => {
	log.debug(`Removing command ${command}`)
	commands = commands.filter(c => String(c.command) != String(command))
}

discord.safeDeleteMessage = msg => {
	// Only delete if able
	if (msg.channel.type !== "dm") {
		msg.delete()
	}
}

// Listen for react to delete message
discord.deletableMessage = async message => {
	await message.react(emoji.poop)
	const filter = (reaction, user) => reaction.emoji.name === emoji.poop && user.id !== message.author.id
	message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
	.then(() => {
		log.debug(`Message deleted`)
		message.delete()
	}).catch(err => {
		try {
			message.reactions.cache.find(r => r.emoji.name === emoji.poop).remove()
		} catch (_) {
			// Ignore
		}
	})
}

// Listen for react to delete message
discord.pinnableMessage = async message => {
	await message.react(emoji.pin)
	const filter = (reaction, user) => reaction.emoji.name === emoji.pin && user.id !== message.author.id
	message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
	.then(() => {
		log.debug(`Message pinned`)
		message.pin()
	}).catch(err => {
		try {
			message.reactions.cache.find(r => r.emoji.name === emoji.pin).remove()
		} catch (_) {
			// Ignore
		}
	})
}

if (!discordToken) {
	// Spam this error to console
	setInterval(() => log.error('NO DISCORD TOKEN!!!'), 3000);
}

module.exports = discord