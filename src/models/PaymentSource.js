module.exports = (sequelize, DataTypes) => {
  const PaymentSource = sequelize.define(
    'PaymentSource',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
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
  return PaymentSource;
};
