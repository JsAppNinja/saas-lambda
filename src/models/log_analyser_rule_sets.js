module.exports = (sequelize, DataTypes) => {
  const log_analyser_rule_sets = sequelize.define(
    'log_analyser_rule_sets',
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
        associate({ log_analysers, log_analyser_rules }) {
          log_analyser_rule_sets.hasMany(log_analysers);
          log_analyser_rule_sets.belongsTo(log_analyser_rules, {
            as: 'log_analyser_rules',
            foreignKey: 'rules',
          });
        },
      },
    },
  );
  return log_analyser_rule_sets;
};
