module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    'customer',
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
        associate({ customer_user, setting }) {
          customer.hasMany(customer_user, {
            as: 'customer_user',
            foreignKey: 'id',
            sourceKey: 'users',
          });
          customer.hasMany(setting, {
            as: 'Setting',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return customer;
};