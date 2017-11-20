const Type = require('./type');

function Struct(typer) {
  if (this instanceof Struct === false) {
    return new Struct(typer);
  }
  this.typer = typer;
  for (let attr in typer) {
    if (typer.hasOwnProperty(attr)) {
      const type = typer[attr];
      if (type instanceof Type === false) {
        throw new Error(`Invalid type of key ${attr}`);
      }
    }
  }
}

Struct.prototype.constructor = Struct;
Struct.prototype.validate = function(obj, options) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const type = this.typer[key];

      // if this key is not define the type then skip
      if (!type) {
        continue;
      }

      try {
        // check the field
        type.__exec__(value);
      } catch (err) {
        throw err;
      }
    }
  }
  return false;
};

/**
 * define a checker
 * @param name
 * @param func
 */
Struct.define = function(name, func) {
  const isFunc = /\w+\(\)$/.test(name); // which name like this .gte()
  const property = name.replace(/\(\)$/, '');
  Object.defineProperty(Type.prototype, property, {
    enumerable: true,
    configurable: false,
    get: function() {
      if (isFunc === true) {
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

// define the official checker

// property check
Struct.define('string', require('./check/string'));
Struct.define('number', require('./check/number'));
Struct.define('int', require('./check/int'));
Struct.define('float', require('./check/float'));
Struct.define('odd', require('./check/odd'));
Struct.define('even', require('./check/even'));
Struct.define('json', require('./check/json'));

// functional check
Struct.define('eq()', require('./check/eq'));
Struct.define('gt()', require('./check/gt'));
Struct.define('gte()', require('./check/gte'));
Struct.define('lt()', require('./check/lt'));
Struct.define('lte()', require('./check/lte'));
Struct.define('bt()', require('./check/between'));

Object.defineProperty(Struct, 'type', {
  enumerable: false,
  configurable: false,
  get: () => new Type()
});

module.exports = Struct;
module.exports.default = Struct;
