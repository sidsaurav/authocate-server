const {
  loginUser,
  logoutUser,
  signupUser,
  getUserById,
  getAllUsers,
  getLoggedInUser,
  updateUser,
} = require('./authController.js')
const authorize = require('./authorize.js')
const rateLimiter = require('./utils/rateLimiter.js')
const express = require('express')

const authRouter = (JWT_SECRET_KEY) => {
  const router = express.Router()
  router
    .route('/api/auth/login')
    .get(authorize(JWT_SECRET_KEY), getLoggedInUser)
    .post(rateLimiter(1000 * 60, 15), loginUser(JWT_SECRET_KEY))
  router
    .route('/api/auth/update')
    .patch(rateLimiter(1000 * 60, 15), authorize(JWT_SECRET_KEY), updateUser)
  router.route('/api/user/:id').get(rateLimiter(1000 * 60, 60), getUserById)
  router
    .route('/api/auth/signup')
    .post(rateLimiter(1000 * 60, 15), signupUser(JWT_SECRET_KEY))
  //   router.route('/api/auth/test').get(getAllUsers)
  return router
}
module.exports = authRouter
