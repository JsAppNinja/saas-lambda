module.exports = (sequelize, DataTypes) => {
  const LogAnalyser = sequelize.define(
    'LogAnalyser',
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
        associate() {},
      },
    }
  );
  return LogAnalyser;
};
