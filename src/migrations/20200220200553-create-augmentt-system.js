'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('augmentt_systems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'CURRENT_TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'CURRENT_TIMESTAMP',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('augmentt_systems');
  }
};