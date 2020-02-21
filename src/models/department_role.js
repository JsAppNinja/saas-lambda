module.exports = (sequelize, DataTypes) => {
  const department_role = sequelize.define(
    'department_role',
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
        associate({ department }) {
          department_role.belongsTo(department, {
            as: 'Department',
            foreignKey: 'department_role',
          });
        },
      },
    }
  );
  return department_role;
};