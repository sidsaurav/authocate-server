const express = require('express')
const morgan = require('morgan')
const authRouter = require('./authRouter.js')
const mongoose = require('mongoose')

const initApp = (conn, JWT_SECRET_KEY) => {
  const app = express()
  app.use((req, res, next) => {
    const userSchema = new mongoose.Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )

    req.conn = conn
    req.User = req.conn.model('User', userSchema)
    next()
  })

  app.listen(5000, () => console.log('Server running on port 5000'))
  app.use(morgan('tiny'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.use(authRouter(JWT_SECRET_KEY))

  app.get('*', (req, res) => {
    res.status(404).send('404 Error : Page not found :(')
  })
}
module.exports = initApp
