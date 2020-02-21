module.exports = (sequelize, DataTypes) => {
  const product_plan = sequelize.define(
    'product_plan',
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
        associate({ product_scope }) {
          product_plan.hasMany(product_scope, {
            as: 'product_scope',
            foreignKey: 'product_scopes',
            targetKey: 'Id',
          });
        },
      },
    }
  );
  return product_plan;
};