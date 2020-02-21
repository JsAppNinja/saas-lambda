'use strict'

const Sequelize = require('sequelize');
const mysql2 = require('mysql2'); // eslint-disable-line
let config = require('../config');

let db = {}
let sequelize
let models = [];
models.push(require('./augmentt_system'));
models.push(require('./augmentt_system_user'));
models.push(require('./customer'));
models.push(require('./customer_subscription'));
models.push(require('./customer_user'));
models.push(require('./department'));
models.push(require('./department_role'));
models.push(require('./log_analyser'));
models.push(require('./log_analyser_result'));
models.push(require('./log_analyser_rule'));
models.push(require('./log_analyser_rule_set'));
models.push(require('./payment_source'));
models.push(require('./product_plan'));
models.push(require('./product_plan_coupon'));
models.push(require('./product_scope'));
models.push(require('./product_subscription_transaction'));
models.push(require('./service_provider'));
models.push(require('./service_provider_user'));
models.push(require('./setting'));
models.push(require('./subscription_invoice'));

sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.readerHost,
  port: config.database.port,
  dialect: 'mysql',
  
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
models.forEach(module => {
  let model = module(sequelize, Sequelize, config.database);
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].options.classMethods.associate) {
    db[modelName].options.classMethods.associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
