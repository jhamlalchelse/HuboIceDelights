const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../../controllers/employeeController');
const verifyRoles = require('../../middleware/verifyRoles');
const roleList = require('../../configs/roleList');
const router = express.Router();

router
  .post('/', verifyRoles(roleList.Admin, roleList.Editor), createEmployee)
  .get('/', getAllEmployees);
router.get('/:id', verifyRoles(roleList.Admin, roleList.Editor), getEmployee);
router.put('/:id', verifyRoles(roleList.Admin), updateEmployee);
router.delete('/:id', verifyRoles(roleList.Admin), deleteEmployee);

module.exports = router;
