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
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'augmentt_system_users',
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
      customers: {
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
            tableName: 'product_plan_coupons',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      service_providers: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'service_providers',
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
    return queryInterface.dropTable('augmentt_systems');
  }
};