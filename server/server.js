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

// GLOBAL VARIABLES
let PREV_ASSAULT_SPRITE_STATE = '';
let PREV_MISSING_SPRITE_STATE = '';

// Function to generate a random interval within a specified range
const getRandomInterval = (max_interval, min_interval) => {
    return Math.floor(Math.random() * (max_interval - min_interval)) + min_interval;
};

// Function to send sprite state updates to all connected clients
const sendStatUpdates = (min_interval, max_interval, states, previousSpriteState, update_text) => {
    // Compute random interval within given range
    const interval = getRandomInterval(max_interval, min_interval);
    console.log(`Sending ${update_text} update. Next update in ${interval} milliseconds`);

    // Select random sprite state
    let randomNumber;
    let spriteState;
    do {
        randomNumber = Math.floor(Math.random() * states.length);
        spriteState = states[randomNumber];
    } while (spriteState === previousSpriteState);  // Ensure the new sprite state is different from the previous one
    previousSpriteState = spriteState;              // Update the previous sprite state

    // Send update to all clients
    const update = JSON.stringify({ [update_text]: spriteState });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(update);
        }
    });

    // Schedule the next update recursively
    setTimeout(() => sendStatUpdates(min_interval, max_interval, states, spriteState, update_text), interval);
};

// Assault Stat (approx. 1929 updates per hour)
sendStatUpdates(1000, 3000, ['hand1', 'hand2', 'hand3', 'hand4', 'hand5', 'hand6'], PREV_ASSAULT_SPRITE_STATE, 'assaultSpriteState');

// Missing Children Stat
sendStatUpdates(5000, 10000, ['hand1', 'hand2', 'hand3', 'hand4', 'hand5', 'hand6'], PREV_MISSING_SPRITE_STATE, 'missingSpriteState');