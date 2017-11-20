/**
 * create a type
 * @returns {Type}
 * @constructor
 */
function Type() {
  if (this instanceof Type === false) {
    return new Type();
  }
  this.task = [];
  this.raw = [];
}

Type.prototype.constructor = Type;
Type.prototype.__exec__ = function(val) {
  // run checker
  const tasks = [].concat(this.task);
  while (tasks.length) {
    const task = tasks.shift();
    const isSuccess = task.call(this, val);
    if (isSuccess === false) {
      throw new Error(`Can not pass the validator ${task.__name__}`);
    }
  }
  return true;
};

Type.define = function(name, func) {
  const isFunctional = /\w+\(\)$/.test(name); // which name like this .gte()
  const property = name.replace(/\(\)$/, '');
  Object.defineProperty(Type.prototype, property, {
    enumerable: true,
    configurable: false,
    get: function() {
      if (isFunctional === true) {
        return argv => {
          func = func.call(this, argv);
          func.__name__ = name;
          this.raw.push(name);
          this.task.push(func);
          return this;
        };
      }
      func.__name__ = name;
      this.raw.push(name);
      this.task.push(func);
      return this;
    }
  });
};

module.exports = Type;
