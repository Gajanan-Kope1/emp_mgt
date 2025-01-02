const { getPagination, getPagingData, createSearchQuery } = require('../helper/common');

const createBaseService = (model) => {
    const create = async (data) => {
        try {
            await model.create(data);
            return {
                status:200,
                msg:"Data created successfully",
                data: null
            };
        } catch (error) {
            return {
                status:400,
                msg: error.message,
                data: null
            };
        }
    };

    const findAll = async (options = {}) => {
        try {
            const { page, size, search, searchFields = [] } = options;
            const { limit, offset } = getPagination(page, size);
            
            const whereClause = search ? createSearchQuery(searchFields, search) : {};
            
            const results = await model.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                ...options,
                distinct: true
            });

            if (results.count === 0) {
                return {
                    status: 200,
                    msg: "No data found",
                    data: null
                };
            }

            const paginatedData = getPagingData(results, page, limit);
            
            return {
                status: 200,
                msg: "Data fetched successfully",
                data: paginatedData
            };
        } catch (error) {
            return {
                status: 400,
                msg: error.message,
                data: null
            };
        }
    };

    const findById = async (id, options = {}) => {
        try {
            const result = await model.findByPk(id, options);
            if (!result) {
                throw new Error(`${model.name} not found`);
            }
            return {
                status:200,
                msg:"Data fetched successfully",
                data: result
            };
        } catch (error) {
            return {
                status:400,
                msg: error.message,
                data: null
            };
        }
    };

    const update = async (id, data) => {
        try {
            const record = await model.findByPk(id);
            if (!record) {
                throw new Error(`${model.name} not found`);
            }
            
            await record.update(data);
            return {
                status:200,
                msg:"Data updated successfully",
                data: null
            };
        } catch (error) {
            return {
                status:400,
                msg: error.message,
                data: null
            };
        }
    };

    const remove = async (id) => {
        try {
            const record = await model.findByPk(id);
            if (!record) {
                throw new Error(`${model.name} not found`);
            }
            
            await record.destroy();
            return {
                status:200,
                msg:`${model.name} deleted successfully`,
                data: null
            };
        } catch (error) {
            return {
                status:400,
                msg: error.message,
                data: null
            };
        }
    };

    return {
        create,
        findAll,
        findById,
        update,
        remove
    };
};

module.exports = createBaseService; 