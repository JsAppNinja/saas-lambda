'use strict'

const Sequelize = require('sequelize');
const mysql2 = require('mysql2'); // eslint-disable-line
let config = require('../config');

let db = {}
let sequelize
let models = [];
models.push(require('./AugmenttSystem'));
models.push(require('./AugmenttSystemUser'));
models.push(require('./Customer'));
models.push(require('./CustomerSubscription'));
models.push(require('./CustomerUser'));
models.push(require('./Department'));
models.push(require('./DepartmentRole'));
models.push(require('./LogAnalyser'));
models.push(require('./LogAnalyserResult'));
models.push(require('./LogAnalyserRule'));
models.push(require('./LogAnalyserRuleSet'));
models.push(require('./PaymentSource'));
models.push(require('./ProductPlan'));
models.push(require('./ProductPlanCoupon'));
models.push(require('./ProductScope'));
models.push(require('./ProductSubscriptionTransaction'));
models.push(require('./ServiceProvider'));
models.push(require('./ServiceProviderUser'));
models.push(require('./Setting'));
models.push(require('./SubscriptionInvoice'));

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
