module.exports = (sequelize, DataTypes) => {
  const log_analysers = sequelize.define(
    'log_analysers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      source_information: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      source_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      results: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rule_set: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ log_analyser_results, log_analyser_rule_sets }) {
          log_analysers.hasMany(log_analyser_results, {
            as: 'log_analyser_results',
            sourceKey: 'results',
          });
          log_analysers.hasMany(log_analyser_rule_sets, {
            as: 'log_analyser_rule_sets',
            sourceKey: 'rule_set',
          });
        },
      },
    }
  );
  return log_analysers;
};