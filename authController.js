const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = (JWT_SECRET_KEY) => async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please provide email and password' })
    }
    const foundUser = await req.User.findOne({ email })

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    foundUser.password = undefined
    const token = jwt.sign({ ...foundUser._doc }, JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    foundUser.token = token
    return res
      .status(200)
      .json({ ...foundUser._doc, token, message: 'Logged in successfully!' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const getLoggedInUser = async (req, res) => {
  try {
    const loggedInUser = await req.User.findOne({
      email: req.userData.email,
    })
    loggedInUser.password = undefined

    return res.status(200).json(loggedInUser)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const signupUser = (JWT_SECRET_KEY) => async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
      return res.status(400).send('Please provide email and password')
    }

    const foundUser = await req.User.findOne({ email })
    if (foundUser) {
      return res.status(401).json({ error: 'User already exists' })
    }
    const createdUser = await req.User.create(req.body)
    if (createdUser) {
      createdUser.password = undefined
      const token = jwt.sign({ ...createdUser }, JWT_SECRET_KEY, {
        expiresIn: '1d',
      })
      return res.status(201).json({
        ...createdUser._doc,
        token,
        message: 'User created successfully!',
      })
    }
  } catch (err) {
    return res.status(401).json({ error: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const loggedInUserID = req.userData._id

    let foundUser = await req.User.findById(loggedInUserID)

    if (!foundUser) {
      return res.status(404).json({
        error: 'User not found. Please contact the owner to get it resolved',
      })
    }

    if (req.body.hasOwnProperty('password')) {
      const hash = await bcrypt.hash(req.body.password, 10)
      req.body.password = hash
    }

    const updatedUser = await req.User.updateOne(
      { _id: loggedInUserID },
      { $set: { ...req.body } }
    )
    const newFoundUser = await req.User.findById(loggedInUserID)

    newFoundUser.password = undefined
    return res.status(200).json({
      ...newFoundUser._doc,
      message: 'User updated successfully!',
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const logoutUser = async (req, res) => {
  res.json({ message: 'Stateless API. Handle in Client side' })
}

const getUserById = async (req, res) => {
  const ID = req.params.id
  const foundUser = await req.User.findById(ID)
  if (!foundUser) {
    return res.status(404).json({ error: 'User not found' })
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
