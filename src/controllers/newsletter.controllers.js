const NewsletterServices = require('../services/newsletter.services')

const signUp = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: `Request body is missing, and needs to have user details`
        });
    }

    try {
        const user = await NewsletterServices.signUp(req.body)
        res.status(201).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        next(error)
        return
    }
}

module.exports = {
    signUp
}