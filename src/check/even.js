const utils = require('../utils');
/**
 * check the type is a even number or not
 * @param input
 * @returns {boolean}
 */
function isEven(input) {
  return utils.isNumber(input) && input % 2 === 0;
}

module.exports = isEven;
