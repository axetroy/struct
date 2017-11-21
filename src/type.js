const utils = require('./utils');

function TypeError(validateName) {
  if (this instanceof TypeError === false) {
    return new TypeError(validateName);
  }
  this.message = `Can not pass the validator ${validateName}`;
}

TypeError.prototype = new Error();
TypeError.prototype.constructor = TypeError;

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
      console.log('throw ' + task.__name__, val, typeof val);
      throw new TypeError(task.__name__);
    }
  }
  return true;
};

Type.define = function(name, checker) {
  if (utils.isFunction(checker) === false) {
    throw new Error(`The argument must be 1: string, 2: function`);
  }
  const isFunctional = /\w+\(\)$/.test(name); // which name like this .gte()
  const property = name.replace(/\(\)$/, '');
  Object.defineProperty(Type.prototype, property, {
    enumerable: true,
    configurable: false,
    get: function() {
      if (isFunctional === true) {
        return argv => {
          const func = checker.call(this, argv);
          func.__name__ = name;
          this.raw.push(name);
          this.task.push(func);
          return this;
        };
      } else {
        checker.__name__ = name;
        this.raw.push(name);
        this.task.push(checker);
        return this;
      }
    }
  });
};

module.exports = Type;
module.exports.Error = TypeError;
