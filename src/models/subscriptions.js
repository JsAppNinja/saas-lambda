module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define(
    'subscriptions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_subscription_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      product_plan: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ organizations, customers, product_plans }) {
          subscriptions.hasMany(organizations);
          subscriptions.hasMany(customers);
          subscriptions.belongsTo(product_plans, {
            as: 'product_plans',
            foreignKey: 'product_plan',
          });
        },
      },
    }
  );
  return subscriptions;
};
