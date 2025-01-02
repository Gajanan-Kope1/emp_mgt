const createBaseService = require('./BaseService');
const db = require('../models');

const baseService = createBaseService(db.Department);

const findAll = async (options = {}) => {
    return baseService.findAll({
        include: ['employees'],
        searchFields: ['name', 'status'],
        ...options
    });
};

const findById = async (id) => {
    return baseService.findById(id, {
        include: ['employees']
    });
};

module.exports = {
    ...baseService,
    findAll,
    findById
}; 