const employeeService = require('../services/EmployeeService');

exports.create = async (req, res) => {
    try {
        const result = await employeeService.create(req.body);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.findAll = async (req, res) => {
    try {
        const { page, size, search } = req.query;
        const result = await employeeService.findAll({ page, size, search });
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.findOne = async (req, res) => {
    try {
        const result = await employeeService.findById(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.update = async (req, res) => {
    try {
        const result = await employeeService.update(req.body.id, req.body);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await employeeService.remove(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};