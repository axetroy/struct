const utils = require('../utils');
/**
 * create a nest stuct
 * @param types
 * @returns {Function}
 */
function objectabc(types) {
  return function objectChecker(input) {
    if (utils.isPlainObject(input) === false) return false;
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        const type = types[key];
        if (!type) {
          continue;
        }
        type.__exec__(value);
      }
    }
    return true;
  };
}

module.exports = objectabc;
