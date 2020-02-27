module.exports = (sequelize, DataTypes) => {
  const augmentt_system_users = sequelize.define(
    'augmentt_system_users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      amazon_id: {
        type: DataTypes.INTEGER,
        unique: true,
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
          augmentt_system_users.hasMany(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return augmentt_system_users;
};