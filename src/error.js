function TypeError(validateName, keys = [], value) {
  if (this instanceof TypeError === false) {
    return new TypeError(validateName);
  }
  this.validator = validateName;
  this.path = keys.filter(v => v !== void 0);
  this.value = value;
  this.detail =
    'Can not pass the validator "' +
    validateName +
    '" with value "' +
    value +
    '" in path "' +
    this.path.join('.') +
    '"';
  this.message = this.detail;
}

TypeError.prototype = new Error();
TypeError.prototype.constructor = TypeError;

module.exports = TypeError;
