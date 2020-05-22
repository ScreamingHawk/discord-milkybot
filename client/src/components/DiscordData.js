import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view'

import H2 from './base/H2'
import socket from '../global/socket'

const DiscordData = () => {
	const [discordData, setDiscordData] = useState(null)

	useEffect(() => {
		socket.on('data is', d => {
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
