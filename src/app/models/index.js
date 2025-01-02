const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Department = require("./department.js")(sequelize, Sequelize);
db.Employee = require("./employee.js")(sequelize, Sequelize);

// Define relationships
db.Department.hasMany(db.Employee, {
    as: "employees",
    foreignKey: "departmentId"
});

db.Employee.belongsTo(db.Department, {
    as: "department",
    foreignKey: "departmentId"
});

module.exports = db;
