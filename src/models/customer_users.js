module.exports = (sequelize, DataTypes) => {
  const customer_users = sequelize.define(
    'customer_users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      amazon_id: {
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.STRING,
      },
      customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      settings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ customers, settings }) {
          customer_users.belongsTo(settings, {
            as: 'settings',
            foreignKey: 'settings',
          });
          customer_users.belongsTo(customers, {
            as: 'customers',
            foreignKey: 'customer',
          });
        },
      },
    }
  );
  return customer_users;
};