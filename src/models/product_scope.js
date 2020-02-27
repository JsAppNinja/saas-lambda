module.exports = (sequelize, DataTypes) => {
  const product_scopes = sequelize.define(
    'product_scopes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      scope_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope_code: {
        type: DataTypes.STRING,
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
  return product_scopes;
};