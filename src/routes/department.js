const ctrDep = require("../app/controllers/department.js");
const departmentValidation = require('../app/middleware/validation/department');
module.exports = function (router) {
	
	router.post("/department/create",departmentValidation.createDepartmentValidation,ctrDep.create);
	router.get("/department/list",ctrDep.findAll);
	router.get("/department/:id",ctrDep.findOne);
	router.put("/department/:id",departmentValidation.updateDepartmentValidation,ctrDep.update);
	router.delete("/department/:id",ctrDep.delete);
};