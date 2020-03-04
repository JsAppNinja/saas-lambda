module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('organizations', 'settings', {
        type: Sequelize.INTEGER,
        references: {
          model: 'settings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('organizations', 'subscription', {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscriptions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('customers', 'organization', {
        type: Sequelize.INTEGER,
        references: {
          model: 'organizations',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('customers', 'subscription', {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscriptions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('customers', 'settings', {
        type: Sequelize.INTEGER,
        references: {
          model: 'settings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('customer_users', 'customer', {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('customer_users', 'settings', {
        type: Sequelize.INTEGER,
        references: {
          model: 'settings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('log_analysers', 'customer', {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('log_analysers', 'source_files', {
        type: Sequelize.INTEGER,
        references: {
          model: 'log_analyser_files',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('subscriptions', 'product_plan', {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_plans',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('product_plans', 'coupon', {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_plan_coupons',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('product_scopes', 'product_plan', {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_plans',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
      queryInterface.addColumn('product_scopes', 'scope_code', {
        type: Sequelize.INTEGER,
        references: {
          model: 'scope_codes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    ]),

  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn('organizations', 'settings'),
      queryInterface.removeColumn('organizations', 'subscription'),
      queryInterface.removeColumn('customers', 'organization'),
      queryInterface.removeColumn('customers', 'subscription'),
      queryInterface.removeColumn('customers', 'settings'),
      queryInterface.removeColumn('customer_users', 'customer'),
      queryInterface.removeColumn('customer_users', 'settings'),
      queryInterface.removeColumn('log_analysers', 'customer'),
      queryInterface.removeColumn('log_analysers', 'source_files'),
      queryInterface.removeColumn('subscriptions', 'product_plan'),
      queryInterface.removeColumn('product_plans', 'coupon'),
      queryInterface.removeColumn('product_scopes', 'product_plan'),
      queryInterface.removeColumn('product_scopes', 'scope_code'),
    ]),
};
