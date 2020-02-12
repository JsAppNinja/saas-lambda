const AWS = require('aws-sdk');
const proxy = require('proxy-agent');

if (process.env.PROXY) {
  AWS.config.update({
    httpOptions: {
      agent: proxy(process.env.PROXY),
    },
  });
}
const KEY_PREFIX = 'ENCRYPTED_';
const encrypted = {};
const decrypted = {};
const kmsEndpoint = process.env.VPC_KMS_ENDPOINT || 'kms.us-east-1.amazonaws.com';

module.exports = (handler) => (event, context) => {
  event.startTimestamp = Date.now();
  const undecryptedKeys = [];
  Object.keys(process.env)
    .forEach((key) => {
      if (new RegExp(KEY_PREFIX).test(key)) {
        if (!decrypted[key]) {
          undecryptedKeys.push(key);
          encrypted[key] = process.env[key];
        }
      }
    });
  console.log(undecryptedKeys);
  if (!undecryptedKeys.length) {
    return handler(event, context);
  }
  // Decrypt code should run once and variables stored outside of the function
  // handler so that these are decrypted once per container
  const kms = new AWS.KMS({ endpoint: kmsEndpoint });
  const promises = undecryptedKeys.map((key) => kms.decrypt({ CiphertextBlob: new Buffer(encrypted[key], 'base64') }).promise()
    .then((data) => {
      decrypted[key] = data.Plaintext.toString('ascii');
    })
    .catch((err) => {
      throw err;
    }));
  return Promise.all(promises)
    .then(() => {
      Object.keys(decrypted)
        .forEach((key) => {
          process.env[key.replace(KEY_PREFIX, '')] = decrypted[key];
          console.log({ key: key.replace(KEY_PREFIX, ''), length: decrypted[key].length });
        });
      return handler(event, context);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
