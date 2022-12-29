const { mongoose, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['general', 'admin']
    },
    blogsPosted: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

const SALT_FACTOR = 10

userSchema.pre('save', function (done) {
    const user = this

    if (!user.isModified('password')) {
        done()
        return
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err)
        }
        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err)
            }

            user.password = hashedPassword
            done()
        })
    })
})


mongoose.model('User', userSchema)