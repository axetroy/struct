/**
 * check the length
 * @param value
 * @returns {boolean}
 */
function len(value) {
  return function(input) {
    return (input ? input.length || 0 : 0) === value;
  };
}

module.exports = len;
