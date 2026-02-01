require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const app = express();


// 🌍 MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));


// 🎨 View Engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


// Routes
app.use("/employees", require("./routes/employeeRoutes"));
app.use("/departments", require("./routes/departmentRoutes"));


// Home redirect
app.get("/", (req, res) => res.redirect("/employees"));


// ⭐ IMPORTANT FOR RENDER DEPLOYMENT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
