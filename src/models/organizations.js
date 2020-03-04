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
      },
      subscription: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ customers, settings, subscriptions }) {
          organizations.hasMany(customers);
          organizations.belongsTo(settings, {
            as: 'settings',
            foreignKey: 'settings',
            sourceKey: 'id',
          });
          organizations.belongsTo(subscriptions, {
            as: 'subscriptions',
            foreignKey: 'subscription',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return organizations;
};
