module.exports = (sequelize, DataTypes) => {
  const product_subscription_transactions = sequelize.define(
    'product_subscription_transactions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate() {},
      },
    }
  );
  return product_subscription_transactions;
};