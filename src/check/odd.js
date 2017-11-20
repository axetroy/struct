const utils = require('../utils');
/**
 * check the type is a odd number or not
 * @param input
 * @returns {boolean}
 */
function isOdd(input) {
  return utils.isNumber(input) && input % 2 !== 0;
}

module.exports = isOdd;
