const mongoose = require('mongoose')

const generateModel = (conn) => {
  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        unique: true,
      },
      profilePic: {
        type: String,
        default:
          'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
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
