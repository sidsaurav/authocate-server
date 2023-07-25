const {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
  getAllUsers,
} = require('./authController.js')
const express = require('express')
const router = express.Router()

router.route('/api/auth/login').get(getUser).post(loginUser)
router.route('/api/auth/signup').post(signupUser)
module.exports = router
