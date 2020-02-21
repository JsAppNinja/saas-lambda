module.exports = (sequelize, DataTypes) => {
  const product_plan_coupon = sequelize.define(
    'product_plan_coupon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ service_provider }) {
          product_plan_coupon.belongsToMany(service_provider, {
            as: 'service_provider',
            foreignKey: 'id',
            targetKey: 'coupons',
          });
        },
      },
    }
  );
  return product_plan_coupon;
};