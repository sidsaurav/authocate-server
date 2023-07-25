const authocate = (config) => {
  const bcrypt = require('bcryptjs')
  const jwt = require('jsonwebtoken')

  // SCHEMA RELATED CODE===============================

  function passwordValidator(str) {
    // Check if the string length is between 6 and 64 (inclusive)
    if (str.length < 6 || str.length > 64) {
      return false
    }

    // Check if the string contains at least one uppercase letter
    if (!/[A-Z]/.test(str)) {
      return false
    }

    // Check if the string contains at least one lowercase letter
    if (!/[a-z]/.test(str)) {
      return false
    }

    // Check if the string contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(str)) {
      return false
    }

    // Check if the string contains at least one number
    if (!/\d/.test(str)) {
      return false
    }

    // If all conditions are met, return true
    return true
  }

  const SCHEMA_REF_OBJ = {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return isStrongPassword(value)
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return EMAIL_REGEX.test(value)
        },
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  }

  const userSchemaObj = {
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return passwordValidator(value)
        },
      },
    },
  }

  if (config.schemaItems.includes('email'))
    userSchemaObj.email = SCHEMA_REF_OBJ.email
  if (config.schemaItems.includes('username'))
    userSchemaObj.username = SCHEMA_REF_OBJ.username
  if (config.schemaItems.includes('firstName'))
    userSchemaObj.firstName = SCHEMA_REF_OBJ.firstName
  if (config.schemaItems.includes('lastName'))
    userSchemaObj.lastName = SCHEMA_REF_OBJ.lastName

  //================================================================

  const loginUser = async (req, res) => {
    const express = require('express')
    const router = express.Router()

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

        const token = jwt.sign(
          { username: foundUser.username },
          config.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        )

        return res
          .status(200)
          .json({ username: foundUser.username, token: token })
      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
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

  module.exports = {
    loginUser,
    logoutUser,
    signupUser,
    getUser,
  }

  router.route('/api/auth/login').get(getUser).post(loginUser)
  router.route('/api/auth/signup').post(signupUser)
}
