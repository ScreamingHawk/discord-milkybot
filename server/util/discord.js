const discordjs = require('discord.js')
const discord = new discordjs.Client()

const log = require('../util/logger')

const discordToken = process.env.DISCORD_TOKEN

discord.initialise = next => {
	discord.on('ready', () => {
		log.info('Discord login successful!')
		next()
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
			log.debug('Ignoring myself')
			return
		}
		// Content without tag
		const c = msg.content.replace(new RegExp(`<@!${msg.client.user.id}>`), '').trim()
		const firstMention = msg.mentions.users.first()
		log.info(c)
		// Runs if the first mention is the bot and the command matches
		if (firstMention &&
				firstMention.id === msg.client.user.id &&
				c.match(new RegExp(`^${command.toLowerCase()}`, 'i'))){
			func(msg)
		}
	})
}

if (!discordToken) {
	// Spam this error to console
	for (let i = 10; i --; ) log.error('NO DISCORD TOKEN!!!')
}

module.exports = discord