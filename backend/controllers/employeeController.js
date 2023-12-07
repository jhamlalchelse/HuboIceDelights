const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }
  try {
    const employee = await Employee.create({ name, email });
    await employee.save();
    res.status(200).json({
      employee,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      employees,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    res.status(200).json({
      employee,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const updateEmployee = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }
  try {
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      { name, email },
      { new: true }
    );
    await employee.save();
    res.status(200).json({
      employee,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json({
      msg: 'delete employee records',
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
