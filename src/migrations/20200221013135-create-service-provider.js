'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('service_providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coupons: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_plan_coupons',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      product_plans: {
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
      users: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'service_provider_users',
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
      managed_customers: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers',
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
    return queryInterface.dropTable('service_providers');
  }
};