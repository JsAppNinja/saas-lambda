module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define(
    'subscriptions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      chargebee_customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
        associate({ customers, product_plans }) {
          subscriptions.hasMany(customers);
          subscriptions.belongsTo(product_plans, {
            as: 'product_plans',
            foreignKey: 'product_plan',
          });
        },
      },
    },
  );
  return subscriptions;
};
