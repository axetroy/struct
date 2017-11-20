const utils = require('../utils');
/**
 * check the type is a great then a number or not
 * @param maxNumber
 * @returns {boolean}
 */
function gt(maxNumber) {
  return function(input) {
    return utils.isNumber(input) && input > maxNumber;
  };
}

module.exports = gt;
