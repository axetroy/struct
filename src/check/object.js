const utils = require('../utils');
const TypeError = require('../error');

/**
 * create a nest stuct
 * @param structure
 * @returns {Function}
 */
function object(structure) {
  return function objectChecker(input) {
    if (utils.isPlainObject(input) === false) {
      return new TypeError('argument', undefined, input);
    }
    const { Struct } = require('../struct');
    const s = new Struct(structure);
    return s.validate(input);
  };
}

module.exports = object;
