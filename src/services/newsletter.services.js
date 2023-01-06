const mongoose = require('mongoose')

const Newsletter = mongoose.model('Newsletter')

const signUp = ({ email, interests }) => {
    return Newsletter.updateOne({ email }, { $set: { interests } }, { upsert: true })
}

module.exports = {
    signUp
}