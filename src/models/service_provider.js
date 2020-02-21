module.exports = (sequelize, DataTypes) => {
  const ServiceProvider = sequelize.define(
    'ServiceProvider',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      coupons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_plans: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      settings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      managed_customers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate() {},
      },
    }
  );
  return ServiceProvider;
};