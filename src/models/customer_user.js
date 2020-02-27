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
        allowNull: false,
        unique: true,
      },
      departments: {
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
        associate({ departments, settings }) {
          customer_users.hasMany(departments, {
            as: 'departments',
            sourceKey: 'departments',
          });
          customer_users.hasMany(settings, {
            as: 'settings',
            sourceKey: 'settings',
          });
        },
      },
    }
  );
  return customer_users;
};