// este archivo es para definir endpoints
const userController = require('./controllers/users');
const arduinoController = require('./controllers/arduino')
const express = require('express');
const cors = require('cors');


const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const path = require('path');

const clientTvPath = path.resolve(__dirname, '../client-tv');
const clientMobilePath = path.resolve(__dirname, '../client-mobile');
const assetsPath = path.resolve(__dirname, '../server/assets');

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.use('/assetsmob', express.static(path.resolve(__dirname, '../client-mobile/assetsmob')));

// Serve Client App 1
app.use('/tv', express.static(clientTvPath));

// Serve Client App 2
app.use('/mobile', express.static(clientMobilePath));

app.use('/assets', express.static(assetsPath));

// Catch-all route for Client App 1
app.get('/tv/*', (req, res) => {
	res.sendFile(path.join(clientTvPath, 'index.html'));
});

// Catch-all route for Client App 2
app.get('/mobile/*', (req, res) => {
	res.sendFile(path.join(clientMobilePath, 'index.html'));
});

const usersRouter = require('./routes/users');

app.use('/', usersRouter);

app.post('/activate-sensor', arduinoController.presenceToServer);
module.exports = app;