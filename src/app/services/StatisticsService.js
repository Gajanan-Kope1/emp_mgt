const db = require('../models');
const { QueryTypes } = require('sequelize');

const getDepartmentHighestSalaries = async () => {
    try {
        const query = `
            SELECT 
                d.name as department,
                e.name as employee_name,
                e.salary as highest_salary
            FROM departments d
            INNER JOIN employees e ON d.id = e.departmentId
            INNER JOIN (
                SELECT departmentId, MAX(salary) as max_salary
                FROM employees
                GROUP BY departmentId
            ) max_sal ON e.departmentId = max_sal.departmentId 
                AND e.salary = max_sal.max_salary
            ORDER BY d.name;
        `;

        const results = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        return {
            status: 200,
            msg: "Data fetched successfully",
            data: results
        };
    } catch (error) {
        return {
            status: 400,
            msg: error.message,
            data: null
        };
    }
};

const getSalaryRangeStats = async () => {
    try {
        const query = `
            SELECT 
                CASE 
                    WHEN salary <= 50000 THEN '0-50000'
                    WHEN salary <= 100000 THEN '50001-100000'
                    ELSE '100000+'
                END as salary_range,
                COUNT(*) as employee_count
            FROM employees
            GROUP BY 
                CASE 
                    WHEN salary <= 50000 THEN '0-50000'
                    WHEN salary <= 100000 THEN '50001-100000'
                    ELSE '100000+'
                END
            ORDER BY 
                CASE salary_range
                    WHEN '0-50000' THEN 1
                    WHEN '50001-100000' THEN 2
                    ELSE 3
                END;
        `;

        const results = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        return {
            status: 200,
            msg: "Data fetched successfully",
            data: results
        };
    } catch (error) {
        return {
            status: 400,
            msg: error.message,
            data: null
        };
    }
};

const getYoungestByDepartment = async () => {
    try {
        const query = `
            SELECT 
                d.name as department,
                e.name as employee_name,
                e.dob,
                TIMESTAMPDIFF(YEAR, STR_TO_DATE(e.dob, '%Y-%m-%d'), CURDATE()) as age
            FROM departments d
            INNER JOIN employees e ON d.id = e.departmentId
            INNER JOIN (
                SELECT 
                    departmentId,
                    MAX(STR_TO_DATE(dob, '%Y-%m-%d')) as max_dob
                FROM employees
                GROUP BY departmentId
            ) youngest ON e.departmentId = youngest.departmentId 
                AND STR_TO_DATE(e.dob, '%Y-%m-%d') = youngest.max_dob
            ORDER BY d.name;
        `;

        const results = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        return {
            status: 200,
            msg: "Data fetched successfully",
            data: results
        };
    } catch (error) {
        return {
            status: 400,
            msg: error.message,
            data: null
        };
    }
};

module.exports = {
    getDepartmentHighestSalaries,
    getSalaryRangeStats,
    getYoungestByDepartment
}; 