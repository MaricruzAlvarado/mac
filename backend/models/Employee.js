const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  nationality: String,
  phone: String,
  civilStatus: String,
  birthday: String
});
module.exports = model("Employee", employeeSchema);
