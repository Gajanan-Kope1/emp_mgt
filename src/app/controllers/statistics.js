const statisticsService = require('../services/StatisticsService');

exports.getDepartmentHighestSalaries = async (req, res) => {
    try {
        const result = await statisticsService.getDepartmentHighestSalaries();
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({
            status: 400,
            msg: error.message,
            data: null
        });
    }
};

exports.getSalaryRangeStats = async (req, res) => {
    try {
        const result = await statisticsService.getSalaryRangeStats();
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({
            status: 400,
            msg: error.message,
            data: null
        });
    }
};

exports.getYoungestByDepartment = async (req, res) => {
    try {
        const result = await statisticsService.getYoungestByDepartment();
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({
            status: 400,
            msg: error.message,
            data: null
        });
    }
}; 