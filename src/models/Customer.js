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
        associate({ AugmenttSystemUser, Setting }) {
          Customer.hasMany(AugmenttSystemUser, {
            as: 'AugmenttSystemUser',
            foreignKey: 'users',
            sourceKey: 'id',
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
