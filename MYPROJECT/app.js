const express = require('express')
const authocate = require('authocate')
const authocateConfig = require('./authocateConfig.js')
const connectDB = require('./db.js')

const app = express()
app.use(express.json())

connectDB()

app.listen(5000, () => console.log('Server running on port 5000'))

const instance = authocate(authocateConfig)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
