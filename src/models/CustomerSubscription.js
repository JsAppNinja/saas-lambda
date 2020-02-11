module.exports = (sequelize, DataTypes) => {
  const CustomerSubscription = sequelize.define(
    'CustomerSubscription',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      invoices: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_scope: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ Department, Setting }) {
          CustomerSubscription.belongsTo(Department, {
            as: 'Department',
            foreignKey: 'DepartmentId',
            targetKey: 'Id',
          });
          CustomerSubscription.belongsTo(Setting, {
            as: 'Setting',
            foreignKey: 'SettingId',
            targetKey: 'Id',
          });
        },
      },
    }
  );
  return CustomerSubscription;
};
