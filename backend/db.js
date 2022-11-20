require('dotenv').config()
const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(
      process.env.DATABASE_URL
    )
    console.log("Mongodb connected :D")
  } catch (error) {
    console.error(error)
  }
}

module.exports = { connectDB }
