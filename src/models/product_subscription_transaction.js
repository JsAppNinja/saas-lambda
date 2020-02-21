module.exports = (sequelize, DataTypes) => {
  const ProductSubscriptionTransaction = sequelize.define(
    'ProductSubscriptionTransaction',
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
        associate({ ServiceProvider }) {
          ProductSubscriptionTransaction.belongsToMany(ServiceProvider, {
            as: 'ServiceProvider',
            foreignKey: 'id',
            targetKey: 'coupons',
          });
        },
      },
    }
  );
  return ProductSubscriptionTransaction;
};