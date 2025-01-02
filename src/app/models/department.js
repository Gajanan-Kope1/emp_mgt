module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    status: {
      type: Sequelize.ENUM("active","inactive"),
      allowNull:false
    },  
  },{timestamps:true});

  return Department;
};
