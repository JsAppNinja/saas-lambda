module.exports = (sequelize, DataTypes) => {
  const subscription_invoice = sequelize.define(
    'subscription_invoice',
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
        associate({ product_subscription_transaction }) {
          subscription_invoice.belongsToOne(product_subscription_transaction, {
            as: 'product_subscription_transaction',
            foreignKey: 'transaction',
            targetKey: 'id',
          });
        },
      },
    }
  );
  return subscription_invoice;
};