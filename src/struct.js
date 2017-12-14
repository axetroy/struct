const { Type, type } = require('./type');
const utils = require('./utils');
const TypeError = require('./error');

function Struct(structure) {
  if (this instanceof Struct === false) {
    return new Struct(structure);
  }
  this.structure = structure;

  if (utils.isPlainObject(structure) === false) {
    throw new Error('Argument of Struct must be an object!');
  }

  for (let attr in structure) {
    if (structure.hasOwnProperty(attr)) {
      const type = structure[attr];
      if (
        type instanceof Type === false &&
        utils.isPlainObject(type) === false
      ) {
        throw new Error('Invalid type of key "' + attr + '"');
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
  const checkedMap = {}; // mark what key have been check
  const structure = this.structure;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const type = structure[key];
      // not define the type
      if (!type) {
        return new TypeError('undefined', [key], undefined);
      }

      if (type instanceof Type === false) {
        return new Error('The type of ' + key + ' is undefined');
      }

      let err = type.__exec__(key, value, []);
      checkedMap[key] = true;
      if (err) {
        return err;
      }
    }
  }

  const keys = Object.keys(structure);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!checkedMap[key]) {
      return new TypeError('require', [key], undefined);
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
Struct.define('len()', require('./check/len'));

module.exports = Struct;
module.exports.Struct = Struct;
module.exports.type = type;
module.exports.Type = Type;
