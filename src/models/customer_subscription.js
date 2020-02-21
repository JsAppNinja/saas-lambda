module.exports = (sequelize, DataTypes) => {
  const customer_subscription = sequelize.define(
    'customer_subscription',
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
        associate({ subscription_invoice, product_scope, product_plan }) {
          customer_subscription.hasMany(subscription_invoice, {
            as: 'subscription_invoice',
            sourceKey: 'invoices',
          });
          customer_subscription.hasOne(product_scope, {
            as: 'product_scope',
            sourceKey: 'product_scope',
          });
          customer_subscription.hasOne(product_plan, {
            as: 'product_plan',
            sourceKey: 'product_plan',
          });
        },
      },
    }
  );
  return customer_subscription;
};
