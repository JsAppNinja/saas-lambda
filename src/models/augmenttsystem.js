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
            foreignKey: 'id',
            sourceKey: 'users',
          });
          AugmenttSystem.hasMany(Setting, {
            as: 'Setting',
            foreignKey: 'id',
            sourceKey: 'settings',
          });
          AugmenttSystem.hasMany(Customer, {
            as: 'Customer',
            foreignKey: 'id',
            sourceKey: 'customers',
          });
          AugmenttSystem.hasMany(ProductPlanCoupon, {
            as: 'ProductPlanCoupon',
            foreignKey: 'id',
            sourceKey: 'coupons',
          });
          AugmenttSystem.hasMany(ProductPlan, {
            as: 'ProductPlan',
            foreignKey: 'id',
            sourceKey: 'product_plans',
          });
          AugmenttSystem.hasMany(ServiceProvider, {
            as: 'ServiceProvider',
            foreignKey: 'id',
            sourceKey: 'service_providers',
          });
        },
      },
    }
  );
  return AugmenttSystem;
};