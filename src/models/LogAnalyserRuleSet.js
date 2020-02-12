module.exports = (sequelize, DataTypes) => {
  const LogAnalyserRuleSet = sequelize.define(
    'LogAnalyserRuleSet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      rules: {
        type: DataTypes.INTEGER,
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
  return LogAnalyserRuleSet;
};
