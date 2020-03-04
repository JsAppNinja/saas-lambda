module.exports = (sequelize, DataTypes) => {
  const log_analyser_files = sequelize.define(
    'log_analyser_files',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
      },
      upload_date: {
        type: DataTypes.DATE,
      },
      external_id: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ log_analysers }) {
          log_analyser_files.hasMany(log_analysers, {
            foreignKey: 'id',
            sourceKey: 'source_files',
          });
        },
      },
    }
  );
  return log_analyser_files;
};
