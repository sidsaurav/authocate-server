const mongoose = require('mongoose')

const defaultUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      format: 'email',
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [32, 'Password must be at most 32 characters'],

      validate: {
        validator: function (value) {
          const uppercaseRegex = /[A-Z]/
          const lowercaseRegex = /[a-z]/
          const numberRegex = /[0-9]/
          const symbolRegex = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/

          const hasUppercase = uppercaseRegex.test(value)
          const hasLowercase = lowercaseRegex.test(value)
          const hasNumber = numberRegex.test(value)
          const hasSymbol = symbolRegex.test(value)

          return hasUppercase && hasLowercase && hasNumber && hasSymbol
        },
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
      },
    },
    username: {
      type: String,
      default: 'User',
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

module.exports = defaultUserSchema
