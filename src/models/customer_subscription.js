module.exports = (sequelize, DataTypes) => {
  const customer_subscriptions = sequelize.define(
    'customer_subscriptions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      invoices: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_scope: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ subscription_invoices, product_scopes, product_plans }) {
          customer_subscriptions.hasMany(subscription_invoices, {
            as: 'subscription_invoices',
            sourceKey: 'invoices',
          });
          customer_subscriptions.hasOne(product_scopes, {
            as: 'product_scopes',
            sourceKey: 'product_scope',
          });
          customer_subscriptions.hasOne(product_plans, {
            as: 'product_plans',
            sourceKey: 'product_plan',
          });
        },
      },
    }
  );
  return customer_subscriptions;
};
