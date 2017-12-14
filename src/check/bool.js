/**
 * check the type is a boolean or not
 * @param input
 * @returns {boolean}
 */
function isBoolean(input) {
  return input === true || input === false || input instanceof Boolean;
}

module.exports = isBoolean;
