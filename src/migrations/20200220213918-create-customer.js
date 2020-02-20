'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      external_customer_id: {
        type: Sequelize.STRING
      },
      users: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customer_users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      settings: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'settings',
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
    return queryInterface.dropTable('customers');
  }
};