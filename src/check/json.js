const utils = require('../utils');
/**
 * check the type is a json string or not
 * @param input
 * @returns {boolean}
 */
function isJson(input) {
  if (utils.isString(input) === false) {
    return false;
  }
  try {
    const d = JSON.parse(input);
    return typeof d === 'object';
  } catch (err) {
    return false;
  }
}

module.exports = isJson;
