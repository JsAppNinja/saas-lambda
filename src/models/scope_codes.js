module.exports = (sequelize, DataTypes) => {
  const scope_codes = sequelize.define(
    'scope_codes',
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ product_scopes }) {
          scope_codes.hasMany(product_scopes);
        },
      },
    }
  );
  return scope_codes;
};
