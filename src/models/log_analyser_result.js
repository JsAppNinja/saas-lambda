module.exports = (sequelize, DataTypes) => {
  const log_analyser_result = sequelize.define(
    'log_analyser_result',
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
        associate({ log_analyser }) {
          log_analyser_result.belongsTo(log_analyser, {
            as: 'log_analyser',
            foreignKey: 'results',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return log_analyser_result;
};