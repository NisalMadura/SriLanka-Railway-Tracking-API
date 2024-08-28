const express = require('express'); // Make sure to include this
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = require('./app'); // Import your existing app if you have routing or middleware setup there

const port = process.env.PORT || 3003;
const server = http.createServer(app); // Use the existing app from your routing
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // Your frontend origin
    methods: ["GET", "POST"]
  }
});

app.use(cors()); // Use CORS middleware for express

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
