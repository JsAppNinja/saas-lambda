module.exports = (sequelize, DataTypes) => {
  const service_provider_users = sequelize.define(
    'service_provider_users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      amazon_id: {
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
        associate({ settings }) {
          service_provider_users.hasMany(settings, {
            as: 'settings',
            foreignKey: 'settings',
          });
        },
      },
    }
  );
  return service_provider_users;
};