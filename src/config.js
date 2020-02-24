const config = {
  database: {
    readerHost     : process.env.DB_RD_HOST || '127.0.0.1',
    port: 3306,
    username     : process.env.DB_USERNAME || 'root',
    password : process.env.DB_PASSWORD || null,
    database : process.env.DB_NAME || 'augmentt_dev',
    dialect  : process.env.DB_DIALECT || 'mysql',
  }
};

module.exports = config;