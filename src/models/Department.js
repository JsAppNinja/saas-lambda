module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      DepartmentName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      DepartmentCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      DepartmentRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ DepartmentRole }) {
          Department.hasMany(DepartmentRole, {
            as: 'DepartmentRole',
            foreignKey: 'DepartmentRole',
            sourceKey: 'Id',
          });
        },
      },
    }
  );
  return Department;
};
