const express = require('express');
const http = require('http');
const webSocket = require('ws');


const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

//connection websocket
wss.on('connection', (ws) => {
    //connection websocket
    ws.on('message', (message) => {
        //gestion des message recu du client
        wss.clients.forEach((client) => {
            //envoie du message a tous les client connecte
            if (client !== ws && client.readyState === webSocket.OPEN) {
                client.send(message);
            }
        });
    });
})


//Demarrage du serveur

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});