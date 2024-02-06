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

// Change player state every 10 seconds
setInterval(() => {
    sendPlayerStateUpdate();
}, 10 * 1000); // 10 seconds

function getRandomPlayerState() {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? 'jump' : 'fall';
}
