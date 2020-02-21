module.exports = (sequelize, DataTypes) => {
  const customer_user = sequelize.define(
    'customer_user',
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
        associate({ department, Setting }) {
          customer_user.hasMany(department, {
            as: 'department',
            sourceKey: 'departments',
          });
          customer_user.hasMany(Setting, {
            as: 'Setting',
            sourceKey: 'settings',
          });
        },
      },
    }
  );
  return customer_user;
};