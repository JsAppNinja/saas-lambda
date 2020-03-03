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
      product_scopes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      coupons: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ product_scopes, product_plan_coupons }) {
          product_plans.belongsTo(product_scopes, {
            as: 'product_scopes',
            foreignKey: 'product_scopes',
          });
          product_plans.belongsTo(product_plan_coupons, {
            as: 'product_plan_coupons',
            foreignKey: 'coupons',
          });
        },
      },
    },
  );
  return product_plans;
};
