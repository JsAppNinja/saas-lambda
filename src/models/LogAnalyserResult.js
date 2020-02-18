module.exports = (sequelize, DataTypes) => {
  const LogAnalyserResult = sequelize.define(
    'LogAnalyserResult',
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
        associate({ LogAnalyzer }) {
          LogAnalyserResult.belongsTo(LogAnalyzer, {
            as: 'LogAnalyzer',
            foreignKey: 'results',
            sourceKey: 'id',
          });
        },
      },
    }
  );
  return LogAnalyserResult;
};
