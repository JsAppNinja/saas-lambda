
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'departments',
      'department_role',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'department_roles',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('customers', 'users'),
  ]),
};
