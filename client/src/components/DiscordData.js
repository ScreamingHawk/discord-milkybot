import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view'

import H2 from './base/H2'
import socket from '../global/socket'

const DiscordData = () => {
	const [discordData, setDiscordData] = useState(null)

	useEffect(() => {
		socket.on('data is', d => {
			console.log(d)
			d = d.guilds.map(g => (
				g.channels.filter(c => c.type === "text").map(c => ({key: c.id, value: `${g.name} - ${c.name}`}))
			)).reduce((a, b) => a.concat(b), [])
			setDiscordData(d)
		})
		return () => {
			socket.off('data is')
		}
	})

	if (!discordData){
		return (
			<H2>Loading discord data...</H2>
		)
	}

	const shouldCollapse = field => {
		return field.name === "channels"
	}
	return (
		<ReactJson src={discordData} theme="monokai" iconStyle="triangle" displayDataTypes={false} displayObjectSize={false} shouldCollapse={shouldCollapse} />
	)
}

export default DiscordData
