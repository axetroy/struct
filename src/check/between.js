const utils = require('../utils');
/**
 *
 * @param minNumber
 * @param maxNumber
 * @returns {Function}
 */
function isBetween(minNumber, maxNumber) {
  return function(input) {
    return utils.isNumber(input) && input > minNumber && input < maxNumber;
  };
}

module.exports = isBetween;
