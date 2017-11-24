const Type = require('./type');
const utils = require('./utils');
const TypeError = require('./error');

function Struct(typer) {
  if (this instanceof Struct === false) {
    return new Struct(typer);
  }
  this.typer = typer;

  if (utils.isPlainObject(typer) === false) {
    throw new Error(`Argument of Struct must be an object!`);
  }

  for (let attr in typer) {
    if (typer.hasOwnProperty(attr)) {
      const type = typer[attr];
      if (
        type instanceof Type === false &&
        utils.isPlainObject(type) === false
      ) {
        throw new Error(`Invalid type of key ${attr}`);
      }
    }
  }
}

Struct.prototype.constructor = Struct;
/**
 * run validator, if false, it will return an error
 * @param obj
 * @returns {*}
 */
Struct.prototype.validate = function(obj) {
  const checked = [];
  const typer = this.typer;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const type = typer[key];
      // if this key is not define the type then skip
      if (!type) {
        return new TypeError(`undefined`, [key], undefined);
      }
      let err = type.__exec__(key, value, []);
      checked.push(key);
      if (err) {
        return err;
      }
    }
  }
  for (let key in typer) {
    if (typer.hasOwnProperty(key)) {
      // have someone key not check
      if (checked.findIndex(v => v === key) < 0) {
        return new TypeError(`require`, [key], undefined);
      }
    }
  }
};

/**
 * define a checker
 * @param name
 * @param func
 */
Struct.define = Type.define.bind(Type);

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
Struct.define('object()', require('./check/object'));
Struct.define('array()', require('./check/array'));
Struct.define('eq()', require('./check/eq'));
Struct.define('gt()', require('./check/gt'));
Struct.define('gte()', require('./check/gte'));
Struct.define('lt()', require('./check/lt'));
Struct.define('lte()', require('./check/lte'));
Struct.define('bt()', require('./check/between'));
Struct.define('in()', require('./check/in'));

Object.defineProperty(Struct, 'type', {
  enumerable: false,
  configurable: false,
  get: () => new Type()
});

module.exports = Struct;
module.exports.default = Struct;
