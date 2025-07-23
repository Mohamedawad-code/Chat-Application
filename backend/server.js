// server.js

const express = require('express');
const http = require('http'); // ✅ Needed for Socket.IO to work
const { Server } = require('socket.io'); // ✅ Import the Socket.IO server
const path = require('path');

const app = express();
const server = http.createServer(app); // ✅ Create a raw HTTP server
const io = new Server(server); // ✅ Attach Socket.IO to the HTTP server

const PORT = 3000;

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../project')));

// Serve index.html explicitly at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../project/index.html'));
});

// ✅ Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('chatMessage', (msg) => {
    console.log('💬 Message received:', msg);
    io.emit('chatMessage', msg); // 🔁 Broadcast message to everyone
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// ✅ Start the server
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

