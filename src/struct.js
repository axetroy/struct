const { Type, type } = require('./type');
const utils = require('./utils');
const TypeError = require('./error');

/**
 * Create a structure
 * @param structure
 * @param paths
 * @returns {Struct}
 * @constructor
 */
function Struct(structure, paths = []) {
  if (this instanceof Struct === false) {
    return new Struct(structure);
  }
  this.paths = paths;
  this.structure = structure;

  if (utils.isPlainObject(structure) === false) {
    throw new Error('Argument of Struct must be an object!');
  }

  for (let attr in structure) {
    if (structure.hasOwnProperty(attr)) {
      const type = structure[attr];
      if (
        type instanceof Type === false &&
        utils.isPlainObject(type) === false &&
        Array.isArray(type) === false
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
  for (let field in data) {
    if (data.hasOwnProperty(field)) {
      const value = data[field];
      const type = structure[field];
      const paths = this.paths.concat(field); // current path in object
      let err;
      // did not found the type for this field
      if (!type) {
        return new TypeError('undefined', paths, undefined);
      }

      // if type is instanceof of Type
      if (type instanceof Type) {
        err = type.__exec__(field, value, this.paths);
      } else if (utils.isPlainObject(type)) {
        // if type is an object
        const s = new Struct(type, paths);
        err = s.validate(value);
      } else if (Array.isArray(type) === true) {
        // the type is an array

        // if the value is not a array
        if (Array.isArray(value) === false) {
          return new TypeError('array', paths, value);
        }

        const t = type[0];

        // if not define the type
        if (!t) {
          return new TypeError('array', paths, value);
        }

        // check every element of array
        for (let i = 0; i < value.length; i++) {
          err = t.__exec__(i, value[i], paths);
          if (err) {
            break;
          }
        }
      }

      checkedMap[field] = true;

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
