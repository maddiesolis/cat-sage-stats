const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Listen for WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send initial player state when a client connects
    sendPlayerStateUpdate();

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        // You can implement further logic here if needed
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to send player state updates to all connected clients
const sendPlayerStateUpdate = () => {
    const playerState = getRandomPlayerState();
    const update = JSON.stringify({ playerState });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(update);
        }
    });
};

// Sends random player state but ensures the same state isn't sent twice in a row
let previousPlayerState = '';
function getRandomPlayerState() {
    let randomNumber;
    let playerState;
    do {
        randomNumber = Math.floor(Math.random() * 6);
        playerState = [
            'hand1',
            'hand2',
            'hand3',
            'hand4',
            'hand5',
            'hand6'
        ][randomNumber];
    } while (playerState === previousPlayerState); // Ensure the new player state is different from the previous one
    previousPlayerState = playerState; // Update the previous player state
    return playerState;
}

// This range results in approx. 1929 updates per hour (reflects statistic)
const MIN_INTERVAL = 1000;
const MAX_INTERVAL = 3000;

// Function to generate a random interval within the specified range
const getRandomInterval = () => {
    return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL)) + MIN_INTERVAL;
};

// Function to send player state updates to all connected clients
const sendPlayerStateUpdateWithRandomInterval = () => {
    const interval = getRandomInterval();
    console.log(`Sending update. Next update in ${interval} milliseconds`);
    sendPlayerStateUpdate();

    // Schedule the next update recursively
    setTimeout(sendPlayerStateUpdateWithRandomInterval, interval);
};

sendPlayerStateUpdateWithRandomInterval();

/**
 * STATS: frequency of sexual assault against women
 * Est. global female population: 3.8 billion (as of 2022)
 * Est. number of women affected: 1/3 * 3.8 billion = 1.27 billion
 * Est. annual occurences: 1.27 billion / avg. life exp. 72 year = 16.9 million occurences per year
 * Freq per day: 16.9 million / 365 days = 46,301 occurences per day
 * Freq per hour: 46,301 / 24 hours = 1929 occurences per hour
 * Freq per minute: 1929 / 60 minutes = 32 occurences per minute
 */