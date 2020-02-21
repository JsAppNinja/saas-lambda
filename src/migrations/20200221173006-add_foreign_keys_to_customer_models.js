
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'customers',
      'users',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'augmentt_system_users',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customers',
      'settings',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'settings',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customer_subscriptions',
      'invoices',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'subscription_invoices',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customer_subscriptions',
      'product_scope',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_scopes',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customer_subscriptions',
      'product_plan',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_plans',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customer_users',
      'departments',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'departments',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'customer_users',
      'settings',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'settings',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('customers', 'users'),
    queryInterface.removeColumn('customers', 'settings'),
    queryInterface.removeColumn('customer_subscriptions', 'invoices'),
    queryInterface.removeColumn('customer_subscriptions', 'product_scope'),
    queryInterface.removeColumn('customer_subscriptions', 'product_plan'),
    queryInterface.removeColumn('customer_users', 'departments'),
    queryInterface.removeColumn('customer_users', 'settings'),
  ]),
};
