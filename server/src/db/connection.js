

const mongoose = require("mongoose")
const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`Database📅 connected successfully ✅`)
    })
    .catch((err) => {
        console.log(`Error occured while conneting DB : ${err.message}`)
    })