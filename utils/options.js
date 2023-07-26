const validator = require('validator')

function isStrongPassword(password) {
  // Check if the password meets all the criteria
  const hasMinimumLength = validator.isLength(password, { min: 6 })
  const hasMaximumLength = validator.isLength(password, { max: 100 })
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasTwoDigits = /\d.*\d/.test(password)
  const hasNoSpaces = !/\s/.test(password)

  // Return true if all conditions are met, otherwise false
  return (
    hasMinimumLength &&
    hasMaximumLength &&
    hasUppercase &&
    hasLowercase &&
    hasTwoDigits &&
    hasNoSpaces
  )
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

schemaObj = {
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

//   { timestamps: true }

// email and pass are must
