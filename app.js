const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')
const cookieParser = require('cookie-parser')

const fs = require('fs')

const cloudinary = require('cloudinary').v2

const usersRouter = require('./routes/user')
const tasksRouter = require('./routes/task')

const PORT = config.PORT || process.env.PORT

mongoose.connect(
    config.DATABASE,
    config.DB_OPTIONS,
        (err) => {
        if (err) throw err
        else console.log('Connected to the database')
    }
)

cloudinary.config(config.CLOUDINARY)

app.use(express.json( {limit: '50mb'}) )
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())

app.use('/api/user', usersRouter)
app.use('/api/tasks', tasksRouter)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})