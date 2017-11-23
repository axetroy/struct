const utils = require('../utils');
const TypeError = require('../error');
/**
 * create a nest stuct
 * @param types
 * @returns {Function}
 */
function objectabc(types) {
  return function objectChecker(input) {
    if (utils.isPlainObject(input) === false) {
      return new TypeError('argument', undefined, input);
    }
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        const type = types[key];
        if (!type) {
          continue;
        }
        const err = type.__exec__(key, value);
        if (err) {
          return err;
        }
      }
    }
  };
}

module.exports = objectabc;
