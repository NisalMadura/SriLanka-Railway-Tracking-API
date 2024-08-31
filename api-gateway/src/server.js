const express = require('express'); 
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = require('./app'); 

const port = process.env.PORT || 3003;
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", 
    methods: ["GET", "POST"]
  }
});

app.use(cors()); 


io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
