module.exports = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'augmentt_dev',
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: 0,
};
