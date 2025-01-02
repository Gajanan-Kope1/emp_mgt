const { body } = require('express-validator');
const validate = require('./validator');
const db = require('../../models');
const { encrypt } = require('../../helper/encryption');

const createEmployeeValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const existingEmployee = await db.Employee.findOne({ where: { email } });
            if (existingEmployee) {
                throw new Error('Email already in use');
            }
            return true;
        }),
    body('phone')
        .notEmpty().withMessage('Phone is required')
        .isString().withMessage('Phone must be a string')
        .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 characters')
        .custom(async (phone) => {
            const existingEmployee = await db.Employee.findOne({ 
                where: { phone: encrypt(phone) }
            });
            if (existingEmployee) {
                throw new Error('Phone already in use');
            }
            return true;
        }),
    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isString().withMessage('Date of birth must be a string'),
    body('photo')
        .notEmpty().withMessage('Photo is required')
        .isString().withMessage('Photo must be a string'),
    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isFloat().withMessage('Salary must be a number'),  
    body('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    body('departmentId')
        .notEmpty().withMessage('Department ID is required')
        .isInt().withMessage('Department ID must be an integer')
        .custom(async (departmentId) => {
            const department = await db.Department.findByPk(departmentId);
            if (!department) {
                throw new Error('Department not found');
            }
            return true;
        }),
    validate
];

const updateEmployeeValidation = [
    body('id')
        .notEmpty().withMessage('Employee ID is required')
        .isInt().withMessage('Employee ID must be an integer'),
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .custom(async (email, { req }) => {
            const existingEmployee = await db.Employee.findOne({ 
                where: { 
                    email,
                    id: { [db.Sequelize.Op.ne]: req.body.id }
                } 
            });
            if (existingEmployee) {
                throw new Error('Email already in use');
            }
            return true;
        }),
    body('phone')
        .optional()
        .isString().withMessage('Phone must be a string')
        .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 characters')
        .custom(async (phone, { req }) => {
            const existingEmployee = await db.Employee.findOne({ 
                where: { 
                    phone: encrypt(phone),
                    id: { [db.Sequelize.Op.ne]: req.body.id }
                }
            });
            if (existingEmployee) {
                throw new Error('Phone already in use');
            }
            return true;
        }),
    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isString().withMessage('Date of birth must be a string'),
    body('photo')
        .notEmpty().withMessage('Photo is required')
        .isString().withMessage('Photo must be a string'),
    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isFloat().withMessage('Salary must be a number'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    body('departmentId')
        .notEmpty().withMessage('Department ID is required')
        .isInt().withMessage('Department ID must be an integer')
        .custom(async (departmentId) => {
            const department = await db.Department.findByPk(departmentId);
            if (!department) {
                throw new Error('Department not found');
            }
            return true;
        }),
    validate
];

module.exports = {
    createEmployeeValidation,
    updateEmployeeValidation
}; 