module.exports = (sequelize, DataTypes) => {
  const CustomerSubscription = sequelize.define(
    'CustomerSubscription',
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
        associate({ SubscriptionInvoice, ProductScope, ProductPlan, Setting }) {
          CustomerSubscription.hasMany(SubscriptionInvoice, {
            as: 'SubscriptionInvoice',
            sourceKey: 'invoices',
          });
          CustomerSubscription.hasOne(ProductScope, {
            as: 'ProductScope',
            sourceKey: 'product_scope',
          });
          CustomerSubscription.hasOne(ProductPlan, {
            as: 'ProductPlan',
            sourceKey: 'product_plan',
          });
        },
      },
    }
  );
  return CustomerSubscription;
};
