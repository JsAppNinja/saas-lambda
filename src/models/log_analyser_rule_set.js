module.exports = (sequelize, DataTypes) => {
  const log_analyser_rule_set = sequelize.define(
    'log_analyser_rule_set',
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
        associate({ LogAnalyser, log_analyser_rule }) {
          log_analyser_rule_set.belongsTo(LogAnalyser, {
            as: 'LogAnalyser',
            foreignKey: 'rule_set',
          });
          log_analyser_rule_set.hasMany(log_analyser_rule, {
            as: 'log_analyser_rule',
            sourceKey: 'rules',
          });
        },
      },
    }
  );
  return log_analyser_rule_set;
};