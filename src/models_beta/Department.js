module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      department_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ DepartmentRole, CustomerUser }) {
          Department.hasMany(DepartmentRole, {
            as: 'DepartmentRole',
            sourceKey: 'department_role',
          });
          Department.belongsTo(CustomerUser, {
            as: 'CustomerUser',
            foreignKey: 'departments'
          });
        },
      },
    }
  );
  return Department;
};
