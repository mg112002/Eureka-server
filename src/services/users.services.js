const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')

const addUser = (userInfo) => {
    return User.create(userInfo)
}

const validateUser = async (loginInfo) => {
    const user = await User.findOne({
        email: loginInfo.email
    })

    if (!user) {
        return null
    }

    const isMatch = await bcrypt.compare(loginInfo.password, user.password)

    if (!isMatch) {
        return null
    }
    return user
}

module.exports = {
    addUser,
    validateUser
}