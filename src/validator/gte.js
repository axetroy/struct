const utils = require('../utils');
/**
 * check the type is a great then a number or equal
 * @param maxNumber
 * @returns {boolean}
 */
function gte(maxNumber) {
  return function(input) {
    return utils.isNumber(input) && input >= maxNumber;
  };
}

module.exports = gte;
