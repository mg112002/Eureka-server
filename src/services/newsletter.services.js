const mongoose = require('mongoose')

const Newsletter = mongoose.model('Newsletter')

const signUp = (userDetails) => {
    return Newsletter.create(userDetails)
}

module.exports = {
    signUp
}