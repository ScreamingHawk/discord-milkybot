const emoji = require('../util/emoji')

const nearestHalf = val => Math.round(val * 2) / 2

module.exports = discord => {
	// Convert
	discord.addHelp('convert', "**Convert metric and imperial**\n```convert 45 kgs```\nThat's 100 pounds for you Americans")
	discord.setCommand(/convert (\d*)'(\d*)"?/i, msg => {
		// Convert handling for feet and inches
		if (msg.matches.length != 3){
			msg.channel.send(`What am I converting? ${emoji.shrug}`)
			return
		}
		const ft = msg.matches[1]
		const inch = msg.matches[2]
		const cm = (feet * 30.48) + (inch * 2.54)
		msg.channel.send(`${ft}'${inch}" = ${cm}cm`)
	})
	discord.setCommand(/convert (\d+\.?\d*)\s?([A-z]+)/i, msg => {
		if (msg.matches.length != 3){
			msg.channel.send(`What am I converting? ${emoji.shrug}`)
			return
		}
		const numFrom = Number(msg.matches[1])
		let unitFrom = msg.matches[2].toLowerCase().replace(/s$/, "") // Remove trailing s
		let numTo = 0
		let unitTo
		switch (unitFrom){
			// Imperial distance
			case "feet":
			case "ft":
				unitFrom = "ft"
				unitTo = "cm"
				numTo = Math.round(numFrom * 30.48)
				break
			case "mile":
			case "mi":
				unitFrom = "mi"
				unitTo = "km"
				numTo = (numFrom * 1.609).toFixed(1)
				break
			// Metric distance
			case "centimeter":
			case "centimetre":
			case "cm":
				unitFrom = "cm"
				// Special case
				unitTo = ""
				const inch = numFrom / 2.54
				const ft = Math.floor(inch / 12)
				numTo = `${ft}'${nearestHalf(inch % 12)}"`
				break
			case "meter":
			case "metre":
			case "m":
				unitFrom = "m"
				unitTo = "ft"
				numTo = Math.round(numFrom * 3.281)
				break
			case "kilometer":
			case "km":
				unitFrom = "km"
				unitTo = "mi"
				numTo = (numFrom / 1.609).toFixed(1)
				break
			// Imperial mass
			case "pound":
			case "lb":
				unitFrom = "lb"
				unitTo = "kg"
				numTo = Math.round(numFrom / 2.205)
				break
			case "ounce":
			case "oz":
				unitFrom = "oz"
				unitTo = "g"
				numTo = Math.round(numFrom * 28.35)
				break
			case "kilogram":
			case "kg":
				unitFrom = "kg"
				unitTo = "lb"
				numTo = Math.round(numFrom * 2.205)
				break
			case "degree":
			case "celcius":
			case "c":
				unitFrom = "C"
				unitTo = "F"
				numTo = Math.round(numFrom * 9 / 5) + 32
				break
			case "farenheit":
			case "f":
				unitFrom = "F"
				unitTo = "C"
				numTo = Math.round((numFrom - 32) * 5 / 9)
				break
			default:
				msg.channel.send(`IDK how to convert that... ${emoji.shrug}`)
		}
		msg.channel.send(`${numFrom} ${unitFrom} = ${numTo} ${unitTo}`)
	})
}
