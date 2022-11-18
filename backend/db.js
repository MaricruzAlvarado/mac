const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://maricruz:corpus-18-99@cluster0.o932oqg.mongodb.net/test"
    )
    console.log("Mongodb connected :D")
  } catch (error) {
    console.error(error)
  }
}

module.exports = { connectDB }
