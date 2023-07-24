const bcrypt = require('bcryptjs')
const User = require('./userSchema')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('./hidden.js')

const loginUser = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide username and password' })
    }
    const foundUser = await User.findOne({ username: username })

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    console.log(foundUser)
    const isMatch = await bcrypt.compare(password, foundUser.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET_KEY, {
      expiresIn: '1d',
    })

    return res.status(200).json({ username: foundUser.username, token: token })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const signupUser = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      return res.status(400).send('Please provide username and password')
    }

    const foundUser = await User.findOne({ username: username })
    console.log(foundUser)
    if (foundUser) {
      return res.status(401).send('User already exists')
    }

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
      username: username,
      password: hash,
    })

    if (createdUser) {
      const token = jwt.sign({ username }, JWT_SECRET_KEY, {
        expiresIn: '1d',
      })
      return res
        .status(201)
        .json({ message: 'User created', username, token: token })
    }
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

const logoutUser = (req, res) => {
  res.send('logout user')
}

const getUser = (req, res) => {
  return res.status(200).json({ message: 'get user' })
}

const getAllUsers = async (req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
}

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
  getAllUsers,
}
