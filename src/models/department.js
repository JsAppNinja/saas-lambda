module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define(
    'department',
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
        associate({ department_role, customer_user }) {
          department.hasMany(department_role, {
            as: 'department_role',
            sourceKey: 'department_role',
          });
          department.belongsTo(customer_user, {
            as: 'customer_user',
            foreignKey: 'departments'
          });
        },
      },
    }
  );
  return department;
};