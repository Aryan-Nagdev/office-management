const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Department = require("../models/Department");


// 📄 LIST + SEARCH + FILTER + PAGINATION
router.get("/", async (req, res) => {
  const { page = 1, search, department, jobTitle } = req.query;
  const limit = 5;

  let query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") }
    ];
  }

  if (department) query.department = department;
  if (jobTitle) query.jobTitle = jobTitle;

  const employees = await Employee.find(query)
    .populate("department supervisor")
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Employee.countDocuments(query);
  const pages = Math.ceil(total / limit);
  const departments = await Department.find();

  res.render("employees/index", {
    employees,
    departments,
    pages,
    currentPage: page,
    search,
    department,
    jobTitle
  });
});


// ➕ NEW FORM
router.get("/new", async (req, res) => {
  const departments = await Department.find();
  const supervisors = await Employee.find();
  res.render("employees/new", { departments, supervisors });
});


// 📝 CREATE
router.post("/", async (req, res) => {
  if (!req.body.supervisor) req.body.supervisor = null;
  await Employee.create(req.body);
  res.redirect("/employees");
});


// ✏ EDIT FORM
router.get("/:id/edit", async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  const departments = await Department.find();
  const supervisors = await Employee.find();
  res.render("employees/edit", { emp, departments, supervisors });
});


// 🔄 UPDATE
router.put("/:id", async (req, res) => {
  if (!req.body.supervisor) req.body.supervisor = null;
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/employees");
});


// ❌ DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/employees");
});


module.exports = router;
