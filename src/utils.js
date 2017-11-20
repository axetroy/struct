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

function isPlainObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

module.exports.isString = isString;
module.exports.isNumber = isNumber;
module.exports.isFunction = isFunction;
module.exports.isPlainObject = isPlainObject;
