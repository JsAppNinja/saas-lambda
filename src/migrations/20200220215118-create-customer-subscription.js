'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoices: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'subscription_invoices',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      product_scope: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_scopes',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      product_plan: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_plans',
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
    return queryInterface.dropTable('customer_subscriptions');
  }
};