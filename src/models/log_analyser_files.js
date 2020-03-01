module.exports = (sequelize, DataTypes) => {
  const log_analyser_files = sequelize.define(
    'log_analyser_files',
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
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      upload_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ log_analysers }) {
          log_analyser_files.hasMany(log_analysers);
        },
      },
    }
  );
  return log_analyser_files;
};