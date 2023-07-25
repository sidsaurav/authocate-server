const authocateConfig = {
  //   MONGO_URI: process.env.MONGO_URI,
  schemaItems: ['email', 'username', 'password'],
  JWT_SECRET_KEY: 'secret',
}

module.exports = authocateConfig

// always connect to mongo db before using the middleware
