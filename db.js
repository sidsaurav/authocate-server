const MONGO_URI =
  'mongodb+srv://sidsaurav11:Test1234@cluster0.j1wrspi.mongodb.net/'

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
module.exports = connectDB
