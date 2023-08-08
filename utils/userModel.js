const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const generateModel = (conn, userSchema) => {
  userSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next()
      }

      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    } catch (error) {
      return next(error)
    }
  })

  const User = conn.model('User', userSchema)

  return User
}

module.exports = generateModel

// remember to include email, password as it is
