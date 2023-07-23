const {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
  getAllUsers,
} = require('./authController.js')
const express = require('express')
const router = express.Router()

router.route('/login').get(getUser).post(loginUser)
router.route('/signup').post(signupUser)
router.route('/test').get(getAllUsers)
module.exports = router
