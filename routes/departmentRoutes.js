const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.render("departments/index", { departments });
});

router.post("/", async (req, res) => {
  await Department.create({ name: req.body.name });
  res.redirect("/departments");
});

module.exports = router;
