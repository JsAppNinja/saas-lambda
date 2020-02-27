module.exports = (sequelize, DataTypes) => {
  const departments = sequelize.define(
    'departments',
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
        associate({ department_roles, customer_users }) {
          departments.hasMany(department_roles, {
            as: 'department_roles',
            sourceKey: 'department_role',
          });
          departments.belongsTo(customer_users, {
            as: 'customer_users',
            foreignKey: 'departments'
          });
        },
      },
    }
  );
  return departments;
};