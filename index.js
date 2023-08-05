const authRouter = require('./authRouter.js')
const generateModel = require('./userSchema.js')
const authorize = require('./authorize.js')
const initApp = (app, conn, JWT_SECRET_KEY) => {
  const User = generateModel(conn)

  app.use((req, res, next) => {
    req.User = User
    next()
  })

  app.use(authRouter(JWT_SECRET_KEY))

  console.log('Initialized authentication...')
}
module.exports = { authocate: initApp, authorize }
