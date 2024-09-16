const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
const corsOptions = {
    origin: '*',
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
    methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization'  // Specify allowed headers
};

app.use(cors(corsOptions));  // Apply the CORS middleware
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

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
