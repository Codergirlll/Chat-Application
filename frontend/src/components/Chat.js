import React, { useEffect, useState } from 'react';
import '../Style/chat.css'
import io from 'socket.io-client'
import axios from 'axios'

const Socket = io('http://localhost:4010')

const Chat = () => {

    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {

        axios.get("http://localhost:4010/messages")
            .then(res => setMessages(res.data))
            .catch(err => console.log("Error: ", err))

        const handleMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        Socket.on('message', handleMessage);

        // Cleanup function
        return () => {
            Socket.off('message', handleMessage);  // Remove listener
        };
    }, [])


    const sendMessage = () => {

        if (username && message) {
            const newMessage = { username, message }
            Socket.emit('sendMessage', newMessage)
            setMessage('')
        }

    }


    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className="message">
                        <strong>{msg.username}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                type="text"
                placeholder="Enter a message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button onClick={sendMessage}    >Send</button>
        </div>
    );
};

export default Chat;
