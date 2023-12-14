const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port_py = 1234; 

server.listen(port_py, () => {
  console.log(`PYTHON Server is running on port ${port_py}`);
});

const wsPort = 8765

const wss = new WebSocket.Server({host:`localhost`,port:wsPort });


wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received message from HTML client: ${message}`);
  });
});


app.use(express.json());

app.post('/', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);

  if (receivedData && receivedData.action) {
    console.log('Received action:', receivedData.action);
    wss.clients.forEach((client)=> {
      if (client.readyState === WebSocket.OPEN) {
        client.send(receivedData.action);
      }
    });
  }
  res.sendStatus(200);
});

console.log(`WebSocket server running on port ${wsPort}`);