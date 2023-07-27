const express = require('express')
const morgan = require('morgan')
const authRouter = require('./authRouter.js')
const generateModel = require('./userSchema.js')

const initApp = (conn, JWT_SECRET_KEY) => {
  console.log('Initializing authentication...')
  const app = express()

  const User = generateModel(conn)

  app.listen(5000, () => console.log('Server running on port 5000'))
  app.use((req, res, next) => {
    req.User = User
    next()
  })
  app.use(morgan('tiny'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
  })
  app.use(authRouter(JWT_SECRET_KEY))

  app.get('*', (req, res) => {
    res.status(404).send('404 Error : Page not found :(')
  })
}
module.exports = initApp
