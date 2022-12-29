const { Router } = require('express')
const NewsletterCtrl = require('../controllers/newsletter.controllers')
const router = Router()

router.post('/', NewsletterCtrl.signUp)

module.exports = router