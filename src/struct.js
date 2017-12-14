const { Type, type } = require('./type');
const utils = require('./utils');
const TypeError = require('./error');

/**
 * Create a structure
 * @param structure
 * @returns {Struct}
 * @constructor
 */
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

/**
 * constructor
 * @type {Struct}
 */
Struct.prototype.constructor = Struct;
/**
 * run validator, if false, it will return an error
 * @param data
 * @returns {*}
 */
Struct.prototype.validate = function(data) {
  const checkedMap = {}; // mark what key have been check
  const structure = this.structure;
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const type = structure[key];
      // did not found the type for this field
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
    // if found excess field
    if (!checkedMap[key]) {
      return new TypeError('required', [key], data[key]);
    }
  }
};

/**
 * define a checker
 * @param name
 * @param func
 */
Struct.define = Type.define.bind(Type);

module.exports = Struct;
module.exports.Struct = Struct;
module.exports.type = type;
module.exports.Type = Type;
