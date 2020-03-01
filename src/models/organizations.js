module.exports = (sequelize, DataTypes) => {
  const organizations = sequelize.define(
    'organizations',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      organization_name: {
        type: DataTypes.STRING,
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
        associate({ customers, settings }) {
          organizations.hasMany(customers);
          organizations.belongsTo(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return organizations;
};