module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
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
        associate({ CustomerUser, Setting }) {
          Customer.hasMany(CustomerUser, {
            as: 'CustomerUser',
            foreignKey: 'id',
            sourceKey: 'users',
          });
          Customer.hasMany(Setting, {
            as: 'Setting',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return Customer;
};