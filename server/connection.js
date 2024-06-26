require('dotenv').config()
const mongoose = require('mongoose')
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.jogvfoa.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbUrl)
    .then(() => console.log("mongo connected"))
    .catch(err => console.log(err))