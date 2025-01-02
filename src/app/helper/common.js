const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    
    return {
        totalItems,
        items,
        totalPages,
        currentPage,
        itemsPerPage: limit
    };
};

const createSearchQuery = (searchFields, searchTerm) => {
    const { Op } = require('sequelize');
    if (!searchTerm) return {};

    const query = {
        [Op.or]: searchFields.map(field => ({
            [field]: {
                [Op.like]: `%${searchTerm}%`
            }
        }))
    };

    return query;
};

module.exports = {
    getPagination,
    getPagingData,
    createSearchQuery
};
