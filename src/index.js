// require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { connect } = require('../data/init')

const PORT = process.env.PORT || 3000


app.use(express.static(path.join(process.cwd(), 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/api', (req, res) => {
    res.end('Hello')
})

app.use(function (req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port", PORT)
        })
    })
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })
