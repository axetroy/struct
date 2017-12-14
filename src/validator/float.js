const utils = require('../utils');
/**
 * check the type is a float number or not
 * @param input
 * @returns {boolean}
 */
function isFloat(input) {
  return utils.isNumber(input) && (input + '').indexOf('.') >= 0;
}

module.exports = isFloat;
