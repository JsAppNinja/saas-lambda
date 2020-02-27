module.exports = (sequelize, DataTypes) => {
  const department_roles = sequelize.define(
    'department_roles',
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
        associate({ departments }) {
          department_roles.belongsTo(departments, {
            as: 'Department',
            foreignKey: 'department_roles',
          });
        },
      },
    }
  );
  return department_roles;
};