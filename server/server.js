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

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Listen for WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to generate a random interval within a specified range
const getRandomInterval = (max_interval, min_interval) => {
    return Math.floor(Math.random() * (max_interval - min_interval)) + min_interval;
};

// Function to send sprite state updates to all connected clients
const sendAssaultStatUpdate = () => {
    const spriteState = getRandomSpriteState();
    const update = JSON.stringify({ assaultSpriteState: spriteState });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(update);
        }
    });
};

// Sends random sprite state but ensures the same state isn't sent twice in a row
let previousSpriteState = '';
function getRandomSpriteState() {
    let randomNumber;
    let spriteState;
    do {
        randomNumber = Math.floor(Math.random() * 6);
        spriteState = [
            'hand1',
            'hand2',
            'hand3',
            'hand4',
            'hand5',
            'hand6'
        ][randomNumber];
    } while (spriteState === previousSpriteState);  // Ensure the new sprite state is different from the previous one
    previousSpriteState = spriteState;              // Update the previous sprite state
    return spriteState;
}

// Function to send sprite state updates to all connected clients
const sendAssaultStatUpdateWithRandomInterval = () => {
    // This range results in approx. 1929 updates per hour (reflects statistic)
    const min_interval = 1000;
    const max_interval = 3000;
    const interval = getRandomInterval(max_interval, min_interval);
    console.log(`Sending update. Next update in ${interval} milliseconds`);
    sendAssaultStatUpdate();

    // Schedule the next update recursively
    setTimeout(sendAssaultStatUpdateWithRandomInterval, interval);
};

sendAssaultStatUpdateWithRandomInterval();