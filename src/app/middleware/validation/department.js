const { body } = require('express-validator');
const validate = require('./validator');

const createDepartmentValidation = [
    body('name')
        .notEmpty().withMessage('Department name is required')
        .isString().withMessage('Department name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Department name must be between 2 and 50 characters'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    validate
];

const updateDepartmentValidation = [
    body('id')
        .notEmpty().withMessage('Department ID is required')
        .isInt().withMessage('Department ID must be an integer'),
    body('name')
        .notEmpty().withMessage('Department name is required')
        .isString().withMessage('Department name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Department name must be between 2 and 50 characters'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    validate
];

module.exports = {
    createDepartmentValidation,
    updateDepartmentValidation
};
