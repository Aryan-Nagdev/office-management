const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobTitle: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
  country: String,
  state: String,
  city: String
});

module.exports = mongoose.model("Employee", employeeSchema);
