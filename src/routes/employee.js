const ctrEmp = require("../app/controllers/employee.js");
const employeeValidation = require('../app/middleware/validation/employee');

module.exports = function (router) {
	
	router.post("/employee/create",employeeValidation.createEmployeeValidation,ctrEmp.create);
	router.get("/employee/list",ctrEmp.findAll);
	router.get("/employee/:id",ctrEmp.findOne);
	router.put("/employee",employeeValidation.updateEmployeeValidation,ctrEmp.update);
	router.delete("/employee/:id",ctrEmp.delete);
};