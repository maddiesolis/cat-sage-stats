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