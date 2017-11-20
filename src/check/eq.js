/**
 * check the type is equal a value without deepEqual
 * @param value
 * @returns {boolean}
 */
function eq(value) {
  return function(input) {
    return input === value;
  };
}

module.exports = eq;
