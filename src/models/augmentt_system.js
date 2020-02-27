module.exports = (sequelize, DataTypes) => {
  const augmentt_systems = sequelize.define(
    'augmentt_systems',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      users: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      settings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coupons: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_plans: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      service_providers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({
          augmentt_system_users,
          settings,
          customers,
          product_plan_coupons,
          product_plans,
          service_providers,
        }) {
          augmentt_systems.hasMany(augmentt_system_users, {
            as: 'augmentt_system_users',
            foreignKey: 'id',
            sourceKey: 'users',
          });
          augmentt_systems.hasMany(settings, {
            as: 'settings',
            foreignKey: 'id',
            sourceKey: 'settings',
          });
          augmentt_systems.hasMany(customers, {
            as: 'customers',
            foreignKey: 'id',
            sourceKey: 'customers',
          });
          augmentt_systems.hasMany(product_plan_coupons, {
            as: 'product_plan_coupons',
            foreignKey: 'id',
            sourceKey: 'coupons',
          });
          augmentt_systems.hasMany(product_plans, {
            as: 'product_plans',
            foreignKey: 'id',
            sourceKey: 'product_plans',
          });
          augmentt_systems.hasMany(service_providers, {
            as: 'service_providers',
            foreignKey: 'id',
            sourceKey: 'service_providers',
          });
        },
      },
    }
  );
  return augmentt_systems;
};