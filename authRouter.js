const {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
} = require('./authController.js')
const express = require('express')
const router = express.Router()

router.route('/login').get(getUser).post(loginUser)
router.route('/signup').post(signupUser)

module.exports = router
