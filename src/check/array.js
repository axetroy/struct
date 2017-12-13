const TypeError = require('../error');
const { Type } = require('../type');
/**
 * create a nest stuct of a array
 * @param type
 * @returns {Function}
 */
function array(type) {
  if (type instanceof Type === false) {
    return new TypeError('argument', [], type);
  }
  return function objectChecker(input) {
    if (Array.isArray(input) === false) {
      return new TypeError('array', [], input);
    }

    for (let i = 0; i < input.length; i++) {
      const value = input[i];
      const err = type.__exec__(i, value);
      if (err) {
        return err;
      }
    }
  };
}

module.exports = array;
