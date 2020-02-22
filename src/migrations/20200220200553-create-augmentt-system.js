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
      users: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      settings: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      customers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      coupons: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_plans: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      service_providers: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('augmentt_systems');
  }
};