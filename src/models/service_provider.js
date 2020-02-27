module.exports = (sequelize, DataTypes) => {
  const service_providers = sequelize.define(
    'service_providers',
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
        associate({ product_plan_coupons, product_plans, service_provider_users, settings, customers }) {
          service_providers.hasMany(product_plan_coupons, {
            as: 'product_plan_coupons',
            foreignKey: 'coupons',
            sourceKey: 'id',
          });
          service_providers.hasMany(product_plans, {
            as: 'product_plans',
            foreignKey: 'product_plans',
            sourceKey: 'id',
          });
          service_providers.hasMany(service_provider_users, {
            as: 'service_provider_users',
            foreignKey: 'users',
            sourceKey: 'id',
          });
          service_providers.hasMany(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
          service_providers.hasMany(customers, {
            as: 'customers',
            foreignKey: 'managed_customers',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return service_providers;
};