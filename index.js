const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Apply the CORS middleware
app.use(express.json())
app.use(cookiesParser())

const PORT = 3000

app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    })
})

//api endpoints
app.use('/api', router)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at " + PORT)
        console.log(process.env.FRONTEND_URL);

    })
})
