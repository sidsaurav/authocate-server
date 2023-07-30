const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = (JWT_SECRET_KEY) => async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide username and password' })
    }
    const foundUser = await req.User.findOne({ username: username })

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    foundUser.password = undefined
    foundUser.token = token
    return res.status(200).json({ ...foundUser._doc, token })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getLoggedInUser = async (req, res) => {
  try {
    const loggedInUser = await req.User.findOne({
      username: req.userData.username,
    })
    loggedInUser.password = undefined

    return res.status(200).json(loggedInUser)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const signupUser = (JWT_SECRET_KEY) => async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    if (!username || !password) {
      return res.status(400).send('Please provide username and password')
    }

    const foundUser = await req.User.findOne({ username })
    if (foundUser) {
      return res.status(401).json({ message: 'User already exists' })
    }
    if (email) {
      const foundEmail = await req.User.findOne({ email })
      if (foundEmail) {
        return res.status(401).json({ message: 'Email already in use' })
      }
    }

    const hash = await bcrypt.hash(password, 10)
    req.body.password = hash
    const createdUser = await req.User.create(req.body)

    if (createdUser) {
      const token = jwt.sign({ username }, JWT_SECRET_KEY, {
        expiresIn: '1d',
      })
      createdUser.password = undefined
      return res
        .status(201)
        .json({ message: 'User created', user: { ...createdUser._doc, token } })
    }
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

const updateUser = async (req, res) => {
  const loggedInUser = req.userData.username
  let foundUser = await req.User.findOne({ username: loggedInUser })
  if (!foundUser) {
    return res.status(404).json({
      message:
        'API error, this should not happen. Please contact the owner to get it resolved',
    })
  }
  const updatedUser = await req.User.updateOne(
    { username: loggedInUser },
    { $set: { ...req.body } }
  )

  foundUser = await req.User.findOne({ username: loggedInUser })
  foundUser.password = undefined
  return res.status(200).json({
    message: 'User updated successfully!',
    updatedUser: foundUser,
  })
}

const logoutUser = async (req, res) => {
  res.json({ message: 'Stateless API. Handle in Client side' })
}

const getUserById = async (req, res) => {
  const ID = req.params.id
  const foundUser = await req.User.findById(ID)
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  foundUser.password = undefined
  return res.status(200).json(foundUser)
}

const getAllUsers = async (req, res) => {
  const users = await req.User.find()
  return res.status(200).json(users)
}

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  getLoggedInUser,
  getAllUsers,
  getUserById,
  updateUser,
}
