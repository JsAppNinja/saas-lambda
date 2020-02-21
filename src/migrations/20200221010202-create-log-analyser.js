'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('log_analysers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source_information: {
        type: Sequelize.TEXT
      },
      source_type: {
        type: Sequelize.STRING
      },
      results: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analyser_results',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      rule_set: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'log_analyser_rule_sets',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('log_analysers');
  }
};