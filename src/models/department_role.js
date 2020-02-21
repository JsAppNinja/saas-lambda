module.exports = (sequelize, DataTypes) => {
  const DepartmentRole = sequelize.define(
    'DepartmentRole',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ Department }) {
          DepartmentRole.belongsTo(Department, {
            as: 'Department',
            foreignKey: 'department_role',
          });
        },
      },
    }
  );
  return DepartmentRole;
};