const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const Message_Model = require("./db/models/message");
require("dotenv").config();
require("./db/connection");

const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/", require("./routes/userRoute"));

// API endpoint to get messages
// app.get('/messages', async (req, res) => {
//     try {
//         const messages = await Message_Model.find().sort({ timestamp: 1 });
//         res.json(messages);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch messages' });
//     }
// });

// Socket.io connection
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendMessage', async (data) => {
//         console.log("data: ", data)
//         const { username, message } = data;
//         const newMessage = await Message_Model.create({ username, message });
//         console.log("newMessage: ", newMessage)
//         // await newMessage.save();

//         io.emit('message', newMessage);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
