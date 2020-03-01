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
      source_files: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
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
        associate({ customers, log_analyser_files, log_analyser_rule_sets }) {
          log_analysers.hasMany(customers);
          log_analysers.belongsTo(log_analyser_files, {
            as: 'log_analyser_files',
            foreignKey: 'source_files',
          });
          log_analysers.belongsTo(log_analyser_rule_sets, {
            as: 'log_analyser_rule_sets',
            sourceKey: 'rule_set',
          });
        },
      },
    }
  );
  return log_analysers;
};