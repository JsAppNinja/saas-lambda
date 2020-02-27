module.exports = (sequelize, DataTypes) => {
  const log_analyser_results = sequelize.define(
    'log_analyser_results',
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
      log_analyser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ log_analysers }) {
          log_analyser_results.belongsTo(log_analysers, {
            as: 'log_analysers',
            foreignKey: 'results',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return log_analyser_results;
};