# Realtime Chat App with React, Node.js, Socket.io, and MongoDB

## Step-by-Step Guide with Code and Explanation

### 1. Project Setup

```bash
# Create project folders
mkdir realtime-chat-app && cd realtime-chat-app

# Initialize Node.js for backend
mkdir backend && cd backend
npm init -y
npm install express socket.io mongoose dotenv cors
npm install nodemon --save-dev

# Create frontend
cd ..
npx create-react-app frontend
cd frontend
npm install socket.io-client axios react-router-dom
```

### 2. Backend Code (Node.js with Express, Socket.io, and MongoDB)

**Folder structure:**
```
backend
 ├── models
 │   └── Message.js
 ├── .env
 ├── index.js
 └── package.json
```

#### **.env**
```bash
MONGO_URI=mongodb://localhost:27017/chatapp
PORT=5000
```

#### **models/Message.js**
```js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
```

#### **index.js**
```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API endpoint to get messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    const { username, message } = data;
    const newMessage = new Message({ username, message });
    await newMessage.save();

    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 3. Frontend Code (React with Socket.io Client and Axios)

**Folder structure:**
```
frontend
 ├── src
     ├── components
     │   └── Chat.js
     ├── App.js
     └── index.js
```

#### **src/components/Chat.js**
```js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages on load
    axios.get('http://localhost:5000/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to fetch messages', err));

    // Listen for incoming messages
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (message && username) {
      const newMessage = { username, message };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
```

#### **src/App.js**
```js
import React from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Realtime Chat App</h1>
      <Chat />
    </div>
  );
}

export default App;
```

#### **src/App.css**
```css
.chat-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.messages {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}
.message {
  margin: 5px 0;
}
input {
  width: 100%;
  margin: 5px 0;
  padding: 10px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
```

### 4. Run the Application

**Start the backend:**
```bash
cd backend
npm run dev  # Ensure nodemon is configured with a start script
```

**Start the frontend:**
```bash
cd frontend
npm start
```

### 5. Explanation

- **Backend:**
  - `index.js` sets up Express for API endpoints, Socket.io for real-time messaging, and connects to MongoDB.
  - When a user sends a message, it's saved to MongoDB and broadcasted to all connected clients.

- **Frontend:**
  - `Chat.js` uses `socket.io-client` to connect to the backend.
  - Axios fetches initial messages; new messages are updated in real-time via socket events.

### 6. Test the Chat App

Open `http://localhost:3000` in multiple browser windows and see the messages appear in real-time across all clients.

