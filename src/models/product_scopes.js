module.exports = (sequelize, DataTypes) => {
  const product_scopes = sequelize.define(
    'product_scopes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      product_plan: {
        type: DataTypes.INTEGER,
      },
      scope_code: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ product_plans, scope_codes }) {
          product_scopes.hasMany(product_plans, {
            foreignKey: 'product_plan',
            sourceKey: 'id',
          });
          product_scopes.belongsTo(scope_codes, {
            as: 'scope_codes',
            foreignKey: 'scope_code',
          });
        },
      },
    }
  );
  return product_scopes;
};
