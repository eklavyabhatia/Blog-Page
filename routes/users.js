const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const passport = require('passport')

router.get('/profile/:id', passport.checkAuthentication, userController.profile)
router.post('/update/:id', passport.checkAuthentication, userController.update)

router.get('/sign-in', passport.blockAccessIfAuthenticated, userController.signin)
router.get('/sign-up', passport.blockAccessIfAuthenticated, userController.signup)

router.post('/create', userController.create)

router.post('/create-session', passport.authenticate(
    'local',
    { failiureRedirect: '/users/sign-in' }
), userController.createSession)

router.get('/sign-out', userController.destroySession)

module.exports = router