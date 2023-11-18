const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// Connexion WebSocket
wss.on('connection', (ws) => {
    // Gestion des messages reçus du client
    ws.on('message', (message) => {
        // Envoi du message à tous les clients connectés
        console.log(`Message received: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
