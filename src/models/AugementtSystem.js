module.exports = (sequelize, DataTypes) => {
  const AugmenttSystem = sequelize.define(
    'AugmenttSystem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      users: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      settings: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      customers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      coupons: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      product_plans: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      service_providers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({
          AugmenttSystemUser,
          Setting,
          Customer,
          ProductPlanCoupon,
          ProductPlan,
          ServiceProvider,
        }) {
          AugmenttSystem.hasMany(AugmenttSystemUser, {
            as: 'AugmenttSystemUser',
            foreignKey: 'users',
            sourceKey: 'id',
          });
          AugmenttSystem.hasMany(Setting, {
            as: 'Setting',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
          AugmenttSystem.hasMany(Customer, {
            as: 'Customer',
            foreignKey: 'customers',
            sourceKey: 'id',
          });
          AugmenttSystem.hasMany(ProductPlanCoupon, {
            as: 'ProductPlanCoupon',
            foreignKey: 'coupons',
            sourceKey: 'id',
          });
          AugmenttSystem.hasMany(ProductPlan, {
            as: 'ProductPlan',
            foreignKey: 'product_plans',
            sourceKey: 'id',
          });
          AugmenttSystem.hasMany(ServiceProvider, {
            as: 'ServiceProvider',
            foreignKey: 'service_providers',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return AugmenttSystem;
};
