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

let textColor = '#3498db'; // Initial color

// Function to send color updates to all connected clients
const sendColorUpdate = () => {
    const update = JSON.stringify({ textColor });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(update);
        }
    });
};

// Change text color every 10 seconds
setInterval(() => {
    textColor = getRandomColor();
    sendColorUpdate();
}, 10 * 1000); // 10 seconds in milliseconds

function getRandomColor() {
    // Implement your color generation logic here
    // For simplicity, generating a random hex color
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
