
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'departments',
      'department_role',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'department_roles',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('customers', 'users'),
  ]),
};
