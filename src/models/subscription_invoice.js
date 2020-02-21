module.exports = (sequelize, DataTypes) => {
  const SubscriptionInvoice = sequelize.define(
    'SubscriptionInvoice',
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
        associate({ ProductSubscriptionTransaction }) {
          SubscriptionInvoice.belongsToOne(ProductSubscriptionTransaction, {
            as: 'ProductSubscriptionTransaction',
            foreignKey: 'transaction',
            targetKey: 'id',
          });
        },
      },
    }
  );
  return SubscriptionInvoice;
};