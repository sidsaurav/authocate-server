const authRouter = require('./authRouter.js')
const generateModel = require('./utils/userModel.js')
const rateLimiter = require('./utils/rateLimiter.js')
const authorize = require('./authorize.js')
const defaultUserSchema = require('./utils/defaultUserSchema.js')
const schemaValidator = require('./utils/customSchemaValidator.js')
const initApp = (app, conn, JWT_SECRET_KEY, optionalObj) => {
  //   console.log('optional', optionalObj)

  let User = undefined
  if (optionalObj && optionalObj.hasOwnProperty('userSchema')) {
    const isValid = schemaValidator(optionalObj.userSchema)
    if (!isValid) {
      throw new Error('Invalid user schema')
      return
    }
    User = generateModel(conn, optionalObj.userSchema)
  } else {
    User = generateModel(conn, defaultUserSchema)
  }

  app.use((req, res, next) => {
    req.User = User
    next()
  })

  app.use(authRouter(JWT_SECRET_KEY))

  console.log('Initialized authentication')
}
module.exports = { authocate: initApp, authorize, rateLimiter }
