module.exports = (sequelize, DataTypes) => {
  const ProductPlan = sequelize.define(
    'ProductPlan',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ExternalId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ProductScopes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ ProductScope }) {
          ProductPlan.hasMany(ProductScope, {
            as: 'ProductScope',
            foreignKey: 'ProductScopes',
            targetKey: 'Id',
          });
        },
      },
    }
  );
  return ProductPlan;
};
