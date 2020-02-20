'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('augmentt_system', {
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
            tableName: 'augmentt_system_user',
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
            tableName: 'setting',
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
            tableName: 'customer',
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
            tableName: 'product_plan_coupon',
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
            tableName: 'product_plan_coupon',
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
    return queryInterface.dropTable('augmentt_system');
  }
};