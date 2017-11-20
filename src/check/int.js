const utils = require('../utils');
/**
 * check the type is a int or not
 * @param input
 * @returns {boolean}
 */
function isInt(input) {
  return utils.isNumber(input) && (input + '').indexOf('.') < 0;
}

module.exports = isInt;
