'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'augmentt_systems',
        'users',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'augmentt_system_users',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'settings',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'settings',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'customers',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'customers',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'coupons',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'product_plan_coupons',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'product_plans',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'product_plans',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'service_providers',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'service_providers',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'augment_system_users',
        'settings',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'settings',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('augmentt_systems', 'users'),
      queryInterface.removeColumn('augmentt_systems', 'settings'),
      queryInterface.removeColumn('augmentt_systems', 'customers'),
      queryInterface.removeColumn('augmentt_systems', 'coupons'),
      queryInterface.removeColumn('augmentt_systems', 'product_plans'),
      queryInterface.removeColumn('augmentt_systems', 'service_providers'),
      queryInterface.removeColumn('augmentt_system_users', 'settings'),
    ]);
  }
};
