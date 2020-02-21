module.exports = (sequelize, DataTypes) => {
  const log_analyser_rule = sequelize.define(
    'log_analyser_rule',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
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
  return log_analyser_rule;
};