module.exports = (sequelize, DataTypes) => {
  const AugmenttSystemUser = sequelize.define(
    'AugmenttSystemUser',
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
        associate({ AugmenttSystem, Setting }) {
          AugmenttSystemUser.belongsTo(AugmenttSystem, {
            as: 'AugmenttSystemUser',
            foreignKey: 'users',
            sourceKey: 'id',
          });
          AugmenttSystemUser.hasMany(Setting, {
            as: 'Setting',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return AugmenttSystemUser;
};