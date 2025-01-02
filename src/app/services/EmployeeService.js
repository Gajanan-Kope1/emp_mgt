const createBaseService = require('./BaseService');
const db = require('../models');
const { encrypt } = require('../helper/encryption');
const { Op } = require('sequelize');

const baseService = createBaseService(db.Employee);

const create = async (data) => {
    try {
        // Check if phone already exists (need to check encrypted value)
        const existingPhone = await db.Employee.findOne({
            where: { phone: encrypt(data.phone) }
        });
        if (existingPhone) {
            throw new Error('Phone number already in use');
        }

        const existingEmail = await db.Employee.findOne({
            where: { email: data.email }
        });
        if (existingEmail) {
            throw new Error('Email already in use');
        }

        // Check if department exists
        const department = await db.Department.findByPk(data.departmentId);
        if (!department) {
            throw new Error('Department not found');
        }

        return baseService.create(data);
    } catch (error) {
        return {
            status: 400,
            msg: error.message,
            data: null
        };
    }
};

const findAll = async (options = {}) => {
    const { search, ...restOptions } = options;
    
    if (search) {
        // Handle phone number search separately due to encryption
        const encryptedPhoneSearch = encrypt(search);
        const whereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { status: { [Op.like]: `%${search}%` } },
                { phone: { [Op.like]: `%${encryptedPhoneSearch}%` } }
            ]
        };
        
        return baseService.findAll({
            ...restOptions,
            where: whereClause,
            include: ['department']
        });
    }

    return baseService.findAll({
        ...restOptions,
        include: ['department']
    });
};

const findById = async (id) => {
    return baseService.findById(id, {
        include: ['department']
    });
};

const update = async (id, data) => {
    try {
        if (data.phone) {
            // Check if phone already exists for different employee
            const existingPhone = await db.Employee.findOne({
                where: {
                    phone: encrypt(data.phone),
                    id: { [Op.ne]: id }
                }
            });
            if (existingPhone) {
                throw new Error('Phone number already in use');
            }
        }

        if (data.email) {
            const existingEmail = await db.Employee.findOne({
                where: {
                    email: data.email,
                    id: { [Op.ne]: id }
                }
            });
            if (existingEmail) {
                throw new Error('Email already in use');
            }
        }

        if (data.departmentId) {
            const department = await db.Department.findByPk(data.departmentId);
            if (!department) {
                throw new Error('Department not found');
            }
        }

        return baseService.update(id, data);
    } catch (error) {
        return {
            status: 400,
            msg: error.message,
            data: null
        };
    }
};

module.exports = {
    ...baseService,
    create,
    findAll,
    findById,
    update
}; 