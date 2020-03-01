module.exports = (sequelize, DataTypes) => {
  const settings = sequelize.define(
    'settings',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ organizations, customers, customer_users }) {
          settings.hasMany(organizations);
          settings.hasMany(customers);
          settings.hasMany(customer_users);
        },
      },
    }
  );
  return settings;
};