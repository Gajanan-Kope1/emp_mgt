const ctrSta = require("../app/controllers/statistics.js");

module.exports = function (router) {
	
	router.get("/statistics/highest-salaries",ctrSta.getDepartmentHighestSalaries);
	router.get("/statistics/salary-ranges",ctrSta.getSalaryRangeStats);
	router.get("/statistics/youngest-employees",ctrSta.getYoungestByDepartment);
};  