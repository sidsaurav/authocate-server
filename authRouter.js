const {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
  getAllUsers,
} = require('./authController.js')
const express = require('express')

const authRouter = (JWT_SECRET_KEY) => {
  const router = express.Router()
  router
    .route('/api/auth/login')
    .get(authorise(JWT_SECRET_KEY), getUser)
    .post(loginUser(JWT_SECRET_KEY))
  router.route('/api/auth/signup').post(signupUser(JWT_SECRET_KEY))
  router.route('/api/auth/test').get(getAllUsers)
  return router
}
module.exports = authRouter
