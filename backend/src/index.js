'use strict';

const https = require('https')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const WebSocket = require('ws')
const {v4: uuid} = require('uuid')
const shortid = require("shortid")
const {isJson, isUserConnected, sendAll, getAllParticipants} = require("./common");
const {ACTIONS, TYPES} = require('./constants/index')

dotenv.config()

const users = []

const server = https.createServer({
    cert: fs.readFileSync(path.join(__dirname, '/certs/localhost.crt')),
    key: fs.readFileSync(path.join(__dirname, '/certs/localhost.key')),
})

const wss = new WebSocket.Server({
    clientTracking: true,
    host: process.env.HOST || 'localhost',
    server })

server.listen(process.env.PORT || 5000)

function noop() {}

function heartbeat() {
    this.isAlive = true;
}

const handleLogin = (payload, ws) => {
    const {username} = payload
    const userIndex = users.findIndex(user => user.username === username)
    let user = {}
    if( userIndex === -1 ) {
        user = {
            id: shortid.generate(),
            username,
        }
        users.push(user)
    } else {
        user = users[userIndex]
    }

    if( isUserConnected(user.username, wss) === -1 ) {
        ws.userName = user.username
        console.log('New login from '+ user.username)
        const participants = getAllParticipants(users, wss)
        console.log('participants')
        console.log(participants)
        const userResponse = {
            type: TYPES.CURRENT_USER,
            user,
            participants
        }
        ws.send(JSON.stringify(userResponse))
        const shouldBroadcast = {
            type: TYPES.USER_LOGGED_IN,
            from: 'system',
            timestamp: new Date(),
            user,
            message: user.username+ ' joined!'
        }
        sendAll(shouldBroadcast, wss)
    }
    else {
        ws.userName = user.username
        console.log('User was connected from another device '+ user.username)
        const participants = getAllParticipants(users, wss)
        const userResponse = {
            type: TYPES.CURRENT_USER,
            user,
            participants,
        }
        ws.send(JSON.stringify(userResponse))
    }
}

const handleIncomingMessage = (message, ws) => {
    if(isJson(message)) {
        const {action, payload} = JSON.parse(message)
        switch (action) {
            case ACTIONS.LOGIN:
                handleLogin(payload, ws)
                break;
            case ACTIONS.SEND_MESSAGE:
                // handleNewMessage(payload, ws)
                break
            case ACTIONS.EDIT_MESSAGE:
            // handleEditMessage(payload, ws)
                break
            case ACTIONS.DELETE_MESSAGE:
            // handleDeleteMessage(payload, ws)
                break
            default:
                ws.send(JSON.stringify({type: 'error', message: 'Unsupported action'}))
        }
    }
    else {
        console.log(message)
        console.log('json nis')
        ws.send('json nis')
    }
}

wss.on('connection', function connection(ws) {
    ws.id = uuid()
    const {id, userName} = ws
    ws.on('message', message => handleIncomingMessage(message, ws));
    ws.on('close', event => {
        let found = false
        if( ws.userName ) {
            wss.clients.forEach(client => {
                if( client.userName === userName ) {
                    found = true
                    return
                }
            })
            if( !found ) {
                console.log('Socket Disconnected')
                sendAll({
                    type: TYPES.USER_DISCONNECTED,
                    userName,
                    id
                }, wss);
            }
        }

    });
    ws.isAlive = true;
    ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            console.log('Socket Disconnected')
            const {id, userName} = ws
            ws.terminate();
            let found = -1
            wss.clients.forEach(client => {
                if( client.userName === userName ) {
                    found = 1
                    return
                }
            })
            if( !found ) {
                sendAll({
                    type: TYPES.USER_DISCONNECTED,
                    userName,
                    id
                }, wss);
            }
            return 0
        }
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 30000);

wss.on('close', function close(ws) {
    clearInterval(interval);
});