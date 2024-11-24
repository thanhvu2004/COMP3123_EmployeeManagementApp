const express = require("express");
const { body, validationResult } = require("express-validator");
const Employee = require("../models/EmployeesModel");

const router = express.Router();

// GET /api/v1/emp/employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

// POST /api/v1/emp/employees
router.post(
  "/employees",
  [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    body("email").isEmail(),
    body("position").isString().notEmpty(),
    body("salary").isNumeric(),
    body("date_of_joining").isISO8601(),
    body("department").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    } = req.body;

    try {
      const employee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      });
      await employee.save();
      res
        .status(201)
        .json({
          message: "Employee created successfully.",
          employee_id: employee._id,
        });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
);

// GET /api/v1/emp/employees/:eid
router.get("/employees/:eid", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

// PUT /api/v1/emp/employees/:eid
router.put("/employees/:eid", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.eid,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

// DELETE /api/v1/emp/employees
// note: The Delete doesn't return any message due to status code 204 (No Content) explicitly indicates that the response has no body,
// returning JSON content is not compatible with this status.
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res
              .status(404)
              .json({ status: false, message: "Employee not found" });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ status: false, message: "Server error" });
    }
});


module.exports = router;
