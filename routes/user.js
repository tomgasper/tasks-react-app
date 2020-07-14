const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')

router.post('/login',
    userController.logIn
)

router.post('/signup',
    userController.createNew
)

router.get('/logout',
    userController.logOut
)

router.get('/getUser',
    checkAuth,
    userController.getUser
)

module.exports = router