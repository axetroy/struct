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

  if (structure instanceof Type) {
    // rewrite the validate method
    this.validate = function(data) {
      return structure.__exec__(void 0, data, []);
    };
  } else if (Array.isArray(structure)) {
    const t = structure[0];
    // if not define the type
    if (!t || t instanceof Type === false) {
      throw new Error(`Array struct should contain an element type.`);
    }

    // rewrite the validate method
    this.validate = function(data) {
      let err;
      // if the value is not a array
      if (!Array.isArray(data)) {
        return new TypeError('array', paths, data);
      }
      // check every element of array
      for (let i = 0; i < data.length; i++) {
        err = t.__exec__(i, data[i], paths);
        if (err) {
          break;
        }
      }
      return err;
    };
  } else if (utils.isPlainObject(structure)) {
    for (let attr in structure) {
      if (structure.hasOwnProperty(attr)) {
        const type = structure[attr];
        if (
          type instanceof Type === false &&
          !utils.isPlainObject(type) &&
          !Array.isArray(type)
        ) {
          throw new Error('Invalid type of key "' + attr + '"');
        }
      }
    }
  } else {
    throw new Error('Invalid struct argument, It can be Type/Object/Array.');
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
        err = new TypeError('undefined', paths, undefined);
      }

      switch (!err) {
        // if type is instanceof of Type
        case type instanceof Type:
          err = type.__exec__(field, value, this.paths);
          break;
        // if type is an object
        case utils.isPlainObject(type):
          // if type is an object
          const s = new Struct(type, paths);
          err = s.validate(value);
          break;
        // the type is an array
        case Array.isArray(type):
          // if the value is not a array
          if (!Array.isArray(value)) {
            return new TypeError('array', paths, value);
          }

          const t = type[0];

          // if not define the type
          if (!t || t instanceof Type === false) {
            return new TypeError('array', paths, value);
          }

          // check every element of array
          for (let i = 0; i < value.length; i++) {
            err = t.__exec__(i, value[i], paths);
            if (err) {
              break;
            }
          }
          break;
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
