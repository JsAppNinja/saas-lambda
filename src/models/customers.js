module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization: {
        type: DataTypes.INTEGER,
      },
      chargebee_customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      subscription: {
        type: DataTypes.INTEGER,
      },
      settings: {
        type: DataTypes.INTEGER,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({
          organizations,
          customer_users,
          settings,
          log_analysers,
          subscriptions,
        }) {
          customers.hasMany(customer_users);
          customers.hasMany(log_analysers);
          customers.belongsTo(organizations, {
            as: 'organizations',
            foreignKey: 'organization',
            sourceKey: 'id',
          });
          customers.belongsTo(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
          customers.belongsTo(subscriptions, {
            as: 'subscriptions',
            foreignKey: 'subscription',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return customers;
};
