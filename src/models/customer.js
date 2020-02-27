module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_customer_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      users: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      settings: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ customer_users, settings }) {
          customers.hasMany(customer_users, {
            as: 'customer_users',
            foreignKey: 'id',
            sourceKey: 'users',
          });
          customers.hasMany(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return customers;
};