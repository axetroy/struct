/**
 * check the type is a less then a number
 * @param array
 * @returns {boolean}
 */
function isIn(array = []) {
  return function(input) {
    return array.findIndex(input) >= 0;
  };
}

module.exports = isIn;
