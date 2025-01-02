const { encrypt, decrypt } = require('../helper/encryption');

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    phone: {
      type: Sequelize.TEXT("long"),
      allowNull:false,
      set(value) {
        this.setDataValue('phone', encrypt(value));
      },
      get() {
        const encrypted = this.getDataValue('phone');
        return encrypted ? decrypt(encrypted) : null;
      }
    },
    dob: {
      type: Sequelize.STRING,
      allowNull:false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull:false
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull:false
    },
    status: {
      type: Sequelize.ENUM("active","inactive"),
      allowNull:false
    },
  },{timestamps:true});

  return Employee;
};
