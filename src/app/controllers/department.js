const departmentService = require('../services/DepartmentService');

exports.create = async (req, res) => {
    try {
        const result = await departmentService.create(req.body);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.findAll = async (req, res) => {
    try {
        const { page, size, search } = req.query;
        const result = await departmentService.findAll({ page, size, search });
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.findOne = async (req, res) => {
    try {
        const result = await departmentService.findById(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.update = async (req, res) => {
    try {
        const result = await departmentService.update(req.params.id, req.body);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await departmentService.remove(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(400).json({status:400,msg:error.message,data:null});
    }
};