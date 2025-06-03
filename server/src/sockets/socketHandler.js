const Message = require('../db/models/message');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('sendMessage', async (data) => {
            const { username, message } = data;
            const newMessage = await Message.create({ username, message });
            io.emit('message', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = socketHandler;
