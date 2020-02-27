module.exports = (sequelize, DataTypes) => {
  const subscription_invoices = sequelize.define(
    'subscription_invoices',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      transaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ product_subscription_transactions }) {
          subscription_invoices.hasOne(product_subscription_transactions, {
            as: 'product_subscription_transactions',
            foreignKey: 'transaction',
          });
        },
      },
    }
  );
  return subscription_invoices;
};