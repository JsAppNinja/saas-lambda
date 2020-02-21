module.exports = (sequelize, DataTypes) => {
  const augmentt_system_user = sequelize.define(
    'augmentt_system_user',
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
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ augmentt_system, setting }) {
          augmentt_system_user.belongsTo(augmentt_system, {
            as: 'augmentt_system_user',
            foreignKey: 'users',
            sourceKey: 'id',
          });
          augmentt_system_user.hasMany(setting, {
            as: 'setting',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return augmentt_system_user;
};