
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'customers',
      'users',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'augmentt_system_users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'customers',
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
      'customer_subscriptions',
      'invoices',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscription_invoices',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'customer_subscriptions',
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
      'customer_subscriptions',
      'product_plan',
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
      'customer_users',
      'departments',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    ),
    queryInterface.addColumn(
      'customer_users',
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
