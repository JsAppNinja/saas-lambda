module.exports = (sequelize, DataTypes) => {
  const service_provider_user = sequelize.define(
    'service_provider_user',
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
        associate() {},
      },
    }
  );
  return service_provider_user;
};