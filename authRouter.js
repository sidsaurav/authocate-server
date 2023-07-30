const {
  loginUser,
  logoutUser,
  signupUser,
  getUserById,
  getAllUsers,
  getLoggedInUser,
  updateUser,
} = require('./authController.js')
const authorise = require('./authorise.js')
const express = require('express')

const authRouter = (JWT_SECRET_KEY) => {
  const router = express.Router()
  router
    .route('/api/auth/login')
    .get(authorise(JWT_SECRET_KEY), getLoggedInUser)
    .post(loginUser(JWT_SECRET_KEY))
  router.route('/api/auth/update').patch(authorise(JWT_SECRET_KEY), updateUser)
  router.route('/api/user/:id').get(getUserById)
  router.route('/api/auth/signup').post(signupUser(JWT_SECRET_KEY))
  //   router.route('/api/auth/test').get(getAllUsers)
  return router
}
module.exports = authRouter
