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
        allowNull: false,
      },
      subscription: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      settings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      log_analysers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      parent_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      managed_customers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ customer_users, settings, log_analysers, subscriptions }) {
          customers.hasMany(customer_users);
          customers.belongsTo(customer_users, {
            as: 'customer_users',
            foreignKey: 'users',
            sourceKey: 'id',
          });
          customers.belongsTo(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
          customers.belongsTo(log_analysers, {
            as: 'log_analysers',
            foreignKey: 'log_analysers',
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