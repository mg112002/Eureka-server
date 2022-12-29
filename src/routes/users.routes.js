const { Router } = require('express')

const usersCtrl = require('../controllers/users.controllers')
const router = Router()

router.post('/register', usersCtrl.register)
router.post('/login', usersCtrl.login)

module.exports = router