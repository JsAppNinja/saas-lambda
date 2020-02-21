module.exports = (sequelize, DataTypes) => {
  const CustomerUser = sequelize.define(
    'CustomerUser',
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
        associate({ Department, Setting }) {
          CustomerUser.hasMany(Department, {
            as: 'Department',
            sourceKey: 'departments',
          });
          CustomerUser.hasMany(Setting, {
            as: 'Setting',
            sourceKey: 'settings',
          });
        },
      },
    }
  );
  return CustomerUser;
};