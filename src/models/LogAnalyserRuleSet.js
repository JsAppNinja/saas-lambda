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
        associate({ LogAnalyser, LogAnalyserRule }) {
          LogAnalyserRuleSet.belongsTo(LogAnalyser, {
            as: 'LogAnalyser',
            foreignKey: 'rule_set',
          });
          LogAnalyserRuleSet.hasMany(LogAnalyserRule, {
            as: 'LogAnalyserRule',
            sourceKey: 'rules',
          });
        },
      },
    }
  );
  return LogAnalyserRuleSet;
};
