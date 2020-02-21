
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'product_plans',
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
      'service_providers',
      'coupons',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_plan_coupons',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'product_plans',
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
      'service_providers',
      'users',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'service_provider_users',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'service_providers',
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
      'service_providers',
      'managed_customers',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'service_provider_users',
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
      'subscription_invoices',
      'transaction',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'product_plan_subscription_transactions',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('product_plans', 'product_scope'),
    queryInterface.removeColumn('service_providers', 'coupons'),
    queryInterface.removeColumn('service_providers', 'product_plans'),
    queryInterface.removeColumn('service_providers', 'users'),
    queryInterface.removeColumn('service_providers', 'settings'),
    queryInterface.removeColumn('service_providers', 'managed_customers'),
    queryInterface.removeColumn('service_provider_users', 'settings'),
    queryInterface.removeColumn('subscription_invoices', 'transaction'),
  ]),
};
