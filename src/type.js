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
    if (result === false) {
      const err = new TypeError(
        validator,
        parentKeys.concat(key, result.path),
        val
      );
      if (this.message) {
        err.message = this.message;
      }
      return err;
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
Type.define('string', require('./validator/string'));
Type.define('number', require('./validator/number'));
Type.define('int', require('./validator/int'));
Type.define('float', require('./validator/float'));
Type.define('bool', require('./validator/bool'));
Type.define('any', require('./validator/any'));
Type.define('odd', require('./validator/odd'));
Type.define('even', require('./validator/even'));
Type.define('json', require('./validator/json'));

// functional check
Type.define('eq()', require('./validator/eq'));
Type.define('gt()', require('./validator/gt'));
Type.define('gte()', require('./validator/gte'));
Type.define('lt()', require('./validator/lt'));
Type.define('lte()', require('./validator/lte'));
Type.define('bt()', require('./validator/between'));
Type.define('in()', require('./validator/in'));
Type.define('len()', require('./validator/len'));
Type.define('msg()', require('./validator/msg'));
Type.define('func()', require('./validator/func'));

module.exports = { Type, type: TypeTree };
