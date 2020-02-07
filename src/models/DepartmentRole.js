module.exports = (sequelize, DataTypes) => {
  const DepartmentRole = sequelize.define(
    'DepartmentRole',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      IsAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ Department }) {
          DepartmentRole.belongsTo(Department, {
            as: 'Department',
            foreignKey: 'Id',
            targetKey: 'DepartmentRole',
          });
        },
      },
    }
  );
  return DepartmentRole;
};
