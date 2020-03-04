module.exports = (sequelize, DataTypes) => {
  const product_plans = sequelize.define(
    'product_plans',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coupon: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ subscriptions, product_scopes, product_plan_coupons }) {
          product_plans.hasMany(subscriptions);
          product_plans.belongsTo(product_scopes, {
            as: 'product_scopes',
            foreignKey: 'id',
            sourceKey: 'product_plan',
          });
          product_plans.belongsTo(product_plan_coupons, {
            as: 'product_plan_coupons',
            foreignKey: 'coupon',
          });
        },
      },
    }
  );
  return product_plans;
};
