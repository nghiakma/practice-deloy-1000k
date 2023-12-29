const express = require('express')
const app = express()
const port = 42600
const http = require('http');
const WebSocket = require('ws');
const User = require('../models/user');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
require('./routes/userRouter')(app);
require('./routes/historyRouter')(app);
require('./routes/adminRouter')(app);

app.get('/', (req, res) => {
    // Test Absolute import mapOrde
    res.end('<h1>Hello World!</h1><hr>')
  })
app.get('/api/user/all', (req, res) => {
    var data = req.body;
    User.all(data, function (response) {
        res.send({ result: response });
    });
})
const clients = [];

function broadcast(socket, data) {
    console.log(clients.length);
    for (let i = 0; i < clients.length; i++) {
        if (clients[i] !== socket) {
            clients[i].send(data.toString());
        }
    }
}

wss.on('connection', (socket, req) => {
    clients.push(socket);
    socket.on('message', (message) => {
        console.log('received: %s', message);
        broadcast(socket, message);
    });
    socket.on('close', () => {
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        console.log('disconnected');
    });
});
server.listen(port, () => {
    console.log('Server listening on port 42600');
});