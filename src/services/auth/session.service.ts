const util = require('util');
const crypto = require('crypto');

export const session = util.promisify(crypto.randomBytes);
