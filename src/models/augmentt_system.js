module.exports = (sequelize, DataTypes) => {
  const augmentt_system = sequelize.define(
    'augmentt_system',
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
          augmentt_system_user,
          setting,
          customer,
          product_plan_coupon,
          product_plan,
          service_provider,
        }) {
          augmentt_system.hasMany(augmentt_system_user, {
            as: 'augmentt_system_user',
            foreignKey: 'id',
            sourceKey: 'users',
          });
          augmentt_system.hasMany(setting, {
            as: 'setting',
            foreignKey: 'id',
            sourceKey: 'settings',
          });
          augmentt_system.hasMany(customer, {
            as: 'customer',
            foreignKey: 'id',
            sourceKey: 'customers',
          });
          augmentt_system.hasMany(product_plan_coupon, {
            as: 'product_plan_coupon',
            foreignKey: 'id',
            sourceKey: 'coupons',
          });
          augmentt_system.hasMany(product_plan, {
            as: 'product_plan',
            foreignKey: 'id',
            sourceKey: 'product_plans',
          });
          augmentt_system.hasMany(service_provider, {
            as: 'service_provider',
            foreignKey: 'id',
            sourceKey: 'service_providers',
          });
        },
      },
    }
  );
  return augmentt_system;
};