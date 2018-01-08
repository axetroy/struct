function TypeError(validateName, keys = [], value) {
  if (this instanceof TypeError === false) {
    return new TypeError(validateName);
  }
  this.validator = validateName;
  this.path = keys.filter(v => v !== void 0);
  this.value = value;
  this.detail = `Expected a value of type \`${validateName}\` for \'${this.path.join(
    '.'
  )}\' but received \'${value}\'.`;
  this.message = this.detail;
}

TypeError.prototype = new Error();
TypeError.prototype.constructor = TypeError;

module.exports = TypeError;
