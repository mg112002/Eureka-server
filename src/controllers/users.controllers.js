const usersService = require('../services/users.services')
const { Errors } = require('../constants')
const jwt = require('jsonwebtoken')


const register = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: `Request body is missing, and needs to have user details`
        });
    }

    try {
        const user = await usersService.addUser(req.body)

        const userObj = user.toObject();

        delete userObj.password;

        res.status(201).json({
            status: 'success',
            data: userObj
        })
    } catch (error) {
        next(error)
        return
    }
}

const login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: `Request body is missing, and needs to have login details`
        })
    }

    try {
        const user = await usersService.validateUser(req.body)

        if (!user) {
            const error = new Error('Invalid credentials')
            error.name = Errors.Unauthorized
            return next(error)
        }

        // res.json({
        //     status: 'success',
        //     data: {
        //         name: user.name,
        //         email: user.email,
        //         role: user.role
        //     }
        // })
        // generate JWT
        const claims = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) {
                err.name = Errors.InternalServerError
                return next(err)
            }

            res.json({
                status: 'success',
                data: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    token
                }
            })
        })
    } catch (error) {
        const err = new Error('Something went wrong during login')
        err.name = Errors.InternalServerError
        return next(err)
    }
}

module.exports = {
    register,
    login
}