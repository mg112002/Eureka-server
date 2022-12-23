const express = require('express')
const app = express()
require('dotenv').config()
require('./init')
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.end('Hello')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})