module.exports = (sequelize, DataTypes) => {
  const CustomerUser = sequelize.define(
    'CustomerUser',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ProfileName: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      DepartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      SettingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      classMethods: {
        associate({ Department, Setting }) {
          CustomerUser.belongsTo(Department, {
            as: 'Department',
            foreignKey: 'DepartmentId',
            targetKey: 'Id',
          });
          CustomerUser.belongsTo(Setting, {
            as: 'Setting',
            foreignKey: 'SettingId',
            targetKey: 'Id',
          });
        },
      },
    }
  );
  return CustomerUser;
};
