const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
const corsOptions = {
    origin: 'https://chat-app-client-48kp.onrender.com',
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)

};

app.use(cors());  // Apply the CORS middleware
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
    })
})
