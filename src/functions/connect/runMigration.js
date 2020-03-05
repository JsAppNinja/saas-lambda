const { exec } = require('child_process');

module.exports.handler = async (event, context) => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'npx sequelize-cli db:migrate',
      { env: 'development' },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );

    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
};
