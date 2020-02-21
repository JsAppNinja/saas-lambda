module.exports = (sequelize, DataTypes) => {
  const product_subscription_transaction = sequelize.define(
    'product_subscription_transaction',
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
        associate({ service_provider }) {
          product_subscription_transaction.belongsToMany(service_provider, {
            as: 'service_provider',
            foreignKey: 'id',
            targetKey: 'coupons',
          });
        },
      },
    }
  );
  return product_subscription_transaction;
};