const utils = require('../utils');
/**
 * create a nest stuct
 * @param types
 * @returns {Function}
 */
function object(types) {
  return function(input) {
    if (utils.isPlainObject(input)) return false;
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        const type = types[key];
        if (!type) {
          continue;
        }

        if (utils.isPlainObject(value)) {
          return object(type, value);
        }

        type.__exec__(input);
      }
    }
    return true;
  };
}

module.exports = object;
