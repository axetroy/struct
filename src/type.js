const utils = require('./utils');
const TypeError = require('./error');

const TypeTree = {};

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

/**
 * run checker, if check fail, it will return an error object
 * @param key
 * @param val
 * @param parentKeys
 * @returns {Error}
 * @private
 */
Type.prototype.__exec__ = function(key, val, parentKeys = []) {
  const tasks = [].concat(this.task);
  while (tasks.length) {
    const task = tasks.shift();
    const validator = task.__name__;
    const result = task.call(this, val);
    if (result === false || result instanceof TypeError) {
      return new TypeError(validator, parentKeys.concat(key), val);
    }
  }
};

/**
 * define a checker
 * @param name
 * @param checker
 */
Type.define = function(name, checker) {
  if (utils.isFunction(checker) === false) {
    throw new Error('The argument must be 1: string, 2: function');
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
  Object.defineProperty(TypeTree, property, {
    enumerable: true,
    configurable: false,
    get: function() {
      return new Type()[property];
    }
  });
};

module.exports = { Type, type: TypeTree };
