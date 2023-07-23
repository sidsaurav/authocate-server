const bcrypt = require('bcryptjs')
const User = require('../models/userSchema')

const loginUser = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      res.status(400).send('Please provide username and password')
    }

    const foundUser = User.find({ username: username })

    if (!foundUser) {
      res.status(401).send('Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if (!isMatch) {
      res.status(401).send('Invalid credentials')
    }
    res.send('login user')
  } catch (err) {
    res.send(500, err.message)
  }
}

const logoutUser = (req, res) => {
  res.send('logout user')
}
const signupUser = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      res.status(400).send('Please provide username and password')
    }

    const foundUser = await User.find({ username: username })

    if (foundUser) {
      res.status(401).send('User already exists')
    }

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await User.create(
      { username: username, password: hash },
      { timestamps: true }
    )

    if (createdUser) {
      res.send(201, 'User created')
    }
  } catch (err) {
    res.send(401, err.message)
  }
}
const getUser = (req, res) => {
  res.send('get user')
}

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
}
