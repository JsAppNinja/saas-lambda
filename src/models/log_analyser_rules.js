module.exports = (sequelize, DataTypes) => {
  const log_analyser_rules = sequelize.define(
    'log_analyser_rules',
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
        associate({ log_analysers }) {
          log_analyser_rules.hasMany(log_analysers);
        },
      },
    },
  );
  return log_analyser_rules;
};
