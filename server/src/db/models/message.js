

const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const messageModel = mongoose.model("message", messageSchema)

module.exports = messageModel