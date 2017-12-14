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
    const err = task.call(this, val);
    if (err === false) {
      return new TypeError(validator, parentKeys.concat(key, err.keys), val);
    } else if (err instanceof TypeError) {
      return new TypeError(
        err.validator,
        parentKeys.concat(key, err.keys),
        err.value
      );
    }
  }
};

/**
 * define a checker
 * @param {string} name
 * @param {function} checker
 */
Type.define = function(name, checker) {
  if (utils.isFunction(checker) === false) {
    throw new Error('The argument must be 1: string, 2: function');
  }
  const isFunctional = /\w+\(\)$/.test(name); // which name like this .gte()
  const property = name.replace(/\(\)$/, '');

  if (TypeTree.hasOwnProperty(property)) {
    console.warn('WARNING: can not redefine the validator "' + name + '"');
    return;
  }

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

// define the official checker

// property check
Type.define('string', require('./check/string'));
Type.define('number', require('./check/number'));
Type.define('int', require('./check/int'));
Type.define('float', require('./check/float'));
Type.define('bool', require('./check/bool'));
Type.define('any', require('./check/any'));
Type.define('odd', require('./check/odd'));
Type.define('even', require('./check/even'));
Type.define('json', require('./check/json'));

// functional check
Type.define('object()', require('./check/object'));
Type.define('array()', require('./check/array'));
Type.define('eq()', require('./check/eq'));
Type.define('gt()', require('./check/gt'));
Type.define('gte()', require('./check/gte'));
Type.define('lt()', require('./check/lt'));
Type.define('lte()', require('./check/lte'));
Type.define('bt()', require('./check/between'));
Type.define('in()', require('./check/in'));
Type.define('len()', require('./check/len'));

module.exports = { Type, type: TypeTree };
