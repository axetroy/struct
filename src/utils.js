function isString(input) {
  return typeof input === 'string' || input instanceof String;
}

function isNumber(input) {
  return (
    !isNaN(input) && (typeof input === 'number' || input instanceof Number)
  );
}

function isFunction(input) {
  return typeof input === 'function';
}

module.exports.isString = isString;
module.exports.isNumber = isNumber;
module.exports.isFunction = isFunction;
