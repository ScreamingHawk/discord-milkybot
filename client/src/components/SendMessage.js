import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import socket from '../global/socket'

import Button from './base/Button'
import Input from './base/Input'
import Dropdown from './base/Dropdown'

const StyledSendMessage = styled.div`
	width: 100%
	display: flex;
	flex-direction: column;
`

const StyledForm = styled.form`
	text-align: center;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
`

const StyledSending = styled.span`
	width: 100%;
	text-align: center;
	font-style: italic;
	font-size: 1.2em;
`

const SendMessage = () => {
	const [loaded, setLoaded] = useState(true)
	const [channel, setChannel] = useState("")
	const [channelList, setChannelList] = useState([])
	const [message, setMessage] = useState("")

	useEffect(() => {
		socket.on('data is', d => {
			setChannelList(d.channels.sort((a, b) => a.value > b.value))
		})
		return () => {
			socket.off('data is')
		}
	})

	const handleSubmit = e => {
		if (e){
			e.preventDefault()
		}
		if (message === "" || channel === ""){
			return
		}
		setLoaded(false)
		socket.emit('send message', {
			channel,
			message,
		})
		setLoaded(true)
		setChannel("")
		setMessage("")
	}

	return (
		<StyledSendMessage>
			{loaded ? (
				<StyledForm onSubmit={handleSubmit}>
					<Dropdown
						options={channelList}
						onChange={e => setChannel(e.target.value)} />
					<Input
						value={message}
						placeholder="Message"
						onChange={e => setMessage(e.target.value)} />
					<Button
							type="submit">
						Send Message
					</Button>
				</StyledForm>
			) : (
				<StyledSending>Sending...</StyledSending>
			)}
		</StyledSendMessage>
	)
}

export default SendMessage
