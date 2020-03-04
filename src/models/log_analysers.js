module.exports = (sequelize, DataTypes) => {
  const log_analysers = sequelize.define(
    'log_analysers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      customer: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ customers, log_analyser_files }) {
          log_analysers.belongsTo(customers, {
            as: 'customers',
            foreignKey: 'customer',
          });
          log_analysers.belongsTo(log_analyser_files, {
            as: 'log_analyser_files',
            foreignKey: 'source_files',
          });
        },
      },
    }
  );
  return log_analysers;
};
