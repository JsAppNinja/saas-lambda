
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'log_analysers',
      'results',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'log_analyser_results',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'log_analysers',
      'rule_set',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'log_analyser_rule_sets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'log_analyser_results',
      'log_analyser',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'log_analysers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'log_analyser_rule_sets',
      'rules',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'log_analyser_rules',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
