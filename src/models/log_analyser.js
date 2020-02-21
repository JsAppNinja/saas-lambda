module.exports = (sequelize, DataTypes) => {
  const log_analyser = sequelize.define(
    'log_analyser',
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
        associate({ log_analyser_result, log_analyser_rule_set }) {
          log_analyser.hasMany(log_analyser_result, {
            as: 'log_analyser_result',
            sourceKey: 'results',
            targetKey: 'id',
            foreignKey: 'log_analyzer',
          });
          log_analyser.belongsTo(log_analyser_rule_set, {
            as: 'log_analyser_rule_set',
            sourceKey: 'rule_set',
          });
        },
      },
    }
  );
  return log_analyser;
};