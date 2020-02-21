
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'log_analysers',
      'results',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analyser_results',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'log_analysers',
      'rule_set',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analyser_rule_sets',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'log_analyser_results',
      'log_analyser',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analysers',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'log_analyser_rule_sets',
      'rules',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analyser_rules',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('log_analysers', 'results'),
    queryInterface.removeColumn('log_analysers', 'rule_set'),
    queryInterface.removeColumn('log_analyser_results', 'log_analyser'),
    queryInterface.removeColumn('log_analyser_rule_sets', 'rules'),
  ]),
};
