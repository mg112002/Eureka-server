require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { connect } = require('./data/init')
const blogsRoute = require('./src/routes/blogs.routes')
const usersRoute = require('./src/routes/users.routes')
const newsletterRoute = require('./src/routes/newsletter.routes')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/blogs', blogsRoute)
app.use('/api/auth', usersRoute)
app.use('/api/newsletter', newsletterRoute)


app.use(function (req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})

app.use(require('./src/middleware/errors').errorHandler)
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
