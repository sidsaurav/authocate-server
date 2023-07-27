const mongoose = require('mongoose')

const generateModel = (conn) => {
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
      email: {
        type: String,
      },
      profilePic: {
        type: String,
      },
      //   phoneNum: {
      //     type: String,
      //   },
      //   role: {
      //     type: String,
      //   },
      //   lastLoginDate: {
      //     type: Date,
      //   },
    },
    { timestamps: true }
  )
  const User = conn.model('User', userSchema)

  return User
}

module.exports = generateModel
