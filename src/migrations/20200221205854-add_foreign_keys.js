
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'product_plans',
      'product_scope',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_scopes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'coupons',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_plan_coupons',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'product_plans',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_plans',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'users',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'service_provider_users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'settings',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'settings',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_providers',
      'managed_customers',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'service_provider_users',
      'settings',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'settings',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'subscription_invoices',
      'transaction',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_subscription_transactions',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
