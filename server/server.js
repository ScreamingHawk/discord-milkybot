require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const log = require('./util/logger')
const discord = require('./util/discord')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const clientFolder = path.join(__dirname, '..', 'client/build')

// Accept json
app.use(bodyParser.json())

// Serve static files
app.use(express.static(clientFolder))

// Fail over
app.get('*', (req, res)=>{
	res.sendFile(path.join(clientFolder, 'index.html'))
})

// Log in
discord.initialise(() => {
	io.on('connection', socket => {
		require('./routes/data')(io, socket, discord)
		require('./routes/control')(io, socket, discord)
	})
	
	// Start up server
	const port = process.env.PORT || 5000
	server.listen(port)
	
	log.info(`Listing on port ${port}`)
})
