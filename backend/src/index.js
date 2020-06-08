'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const WebSocket = require('ws');

dotenv.config();

const users = []

const server = https.createServer({
    cert: fs.readFileSync(path.join(__dirname, '/certs/localhost.crt')),
    key: fs.readFileSync(path.join(__dirname, '/certs/localhost.key')),
})

const wss = new WebSocket.Server({
    clientTracking: true,
    host: process.env.HOST || 'localhost',
    server });

server.listen(process.env.PORT || 5000);