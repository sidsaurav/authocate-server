const express = require('express')
const morgan = require('morgan')
const authRouter = require('./authRouter.js')
const connectDB = require('./db.js')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
connectDB()
app.listen(5000, () => console.log('Server running on port 5000'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter)
