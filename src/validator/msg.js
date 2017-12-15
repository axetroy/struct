/**
 * define error message for this type
 * @param msg
 * @returns {boolean}
 */
function definedErrorMessage(msg) {
  this.message = msg;
  return function(input) {
    return true;
  };
}

module.exports = definedErrorMessage;
