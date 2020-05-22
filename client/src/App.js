import React from 'react'

import H1 from './components/base/H1'
import HR from './components/base/HR'

import DiscordData from './components/DiscordData'
import SendMessage from './components/SendMessage'

function App() {
	return (
		<div>
			<H1>MilkyBot Dashboard</H1>
			<HR />
			<SendMessage />
			<HR />
			<DiscordData />
		</div>
	)
}

export default App
