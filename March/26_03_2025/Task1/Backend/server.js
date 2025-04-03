const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
