module.exports = (sequelize, DataTypes) => {
  const product_plans = sequelize.define(
    'product_plans',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      product_scopes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ product_scopes }) {
          product_plans.hasMany(product_scopes, {
            as: 'product_scopes',
            foreignKey: 'product_scopes',
            targetKey: 'Id',
          });
        },
      },
    }
  );
  return product_plans;
};