const authRouter = require('./authRouter.js')
const generateModel = require('./userSchema.js')
const authorize = require('./authorize.js')
const initApp = (app, conn, JWT_SECRET_KEY) => {
  console.log('Initializing authentication...')

  const User = generateModel(conn)

  app.use((req, res, next) => {
    req.User = User
    next()
  })

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
  })
  app.use(authRouter(JWT_SECRET_KEY))
}
module.exports = { authocate: initApp, authorize }
