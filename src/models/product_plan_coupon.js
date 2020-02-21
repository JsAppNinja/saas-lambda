module.exports = (sequelize, DataTypes) => {
  const ProductPlanCoupon = sequelize.define(
    'ProductPlanCoupon',
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
        associate({ ServiceProvider }) {
          ProductPlanCoupon.belongsToMany(ServiceProvider, {
            as: 'ServiceProvider',
            foreignKey: 'id',
            targetKey: 'coupons',
          });
        },
      },
    }
  );
  return ProductPlanCoupon;
};