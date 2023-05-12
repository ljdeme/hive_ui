const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')

// Connect to the database on this port. 
const port = 3001

// The express app object we'll be using.
const app = express()

// json parsing middleware 
app.use(express.json())

// This should log the path and the method for each request to the app.
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes for our app 
app.use('/api/users', userRoutes)

// connect to the database and listen for requests
// TODO: Actually get the database URL
mongoose.connect("")
    .then(() => {
        app.listen(port, () => {
            console.log("Connected. Listening on port 3001")
        })
    })
    .catch((error) => {
        console.log(error)
    })