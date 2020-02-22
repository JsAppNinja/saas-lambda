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
            model: 'augmentt_system_users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'settings',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'settings',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'customers',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'customers',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'coupons',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'product_plan_coupons',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'product_plans',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'product_plans',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_systems',
        'service_providers',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'service_providers',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ),
      queryInterface.addColumn(
        'augmentt_system_users',
        'settings',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'settings',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
