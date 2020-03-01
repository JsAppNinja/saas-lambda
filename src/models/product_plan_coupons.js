module.exports = (sequelize, DataTypes) => {
  const product_plan_coupons = sequelize.define(
    'product_plan_coupons',
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
        associate({ product_plans }) {
          product_plan_coupons.hasMany(product_plans);
        },
      },
    }
  );
  return product_plan_coupons;
};