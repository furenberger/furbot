require('dotenv').load();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');

const incomingMiddleware = require('./middleware/incoming');
const outgoingMiddleware = require('./middleware/outgoing');

const server = app.listen(port, '0.0.0.0', () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

const botmaster = new Botmaster({
    server: server
});

const socketioSettings = {
    id: 'furbot',
    server: server
};

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);

//ADMIN BOT
botmaster.use(incomingMiddleware.admin.admin);

botmaster.use(incomingMiddleware.reply.replyToUser);
botmaster.use(incomingMiddleware.weather.weather);

botmaster.use(outgoingMiddleware.messageTransformers.changeText);

botmaster.on('error', (bot, err) => {
    console.log(err.stack);
});




