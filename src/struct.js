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

  switch (true) {
    // type.string
    case structure instanceof Type:
      // rewrite the validate method
      this.validate = function(data) {
        return structure.__exec__(void 0, data, []);
      };
      break;
    // []
    case Array.isArray(structure):
      const t = structure[0];
      // if not define the type
      if (!t || (!Array.isArray(t) && t instanceof Type === false)) {
        throw new Error(`Array struct should contain an element type.`);
      }

      if (t instanceof Type) {
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
      }

      break;
    // {age: type.string}
    case utils.isPlainObject(structure):
      for (let attr in structure) {
        if (structure.hasOwnProperty(attr)) {
          const type = structure[attr];
          if (
            type instanceof Type === false && // support Type
            !utils.isPlainObject(type) && // support object
            !Array.isArray(type) && // support array
            typeof type !== 'function' // support function
          ) {
            throw new Error('Invalid type of key "' + attr + '"');
          }
        }
      }
      break;
    default:
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
        return new TypeError('undefined', paths, value);
      }

      switch (!err) {
        case type instanceof Struct:
          err = type.validate(value);
          if (err) {
            err.path = paths.concat(err.path);
          }
          break;
        // if type is instanceof of Type
        case type instanceof Type:
          err = type.__exec__(field, value, this.paths);
          break;
        // the type is an array
        case Array.isArray(type):
          // if the value is not a array
          if (!Array.isArray(value)) {
            return new TypeError('array', paths, value);
          }

          const t = type[0];

          switch (true) {
            case t instanceof Struct:
              for (let i = 0; i < value.length; i++) {
                err = t.validate(value[i]);
                if (err) {
                  err.path = paths.concat(i, err.path);
                  break;
                }
              }
              break;
            case t instanceof Type: //[type.string]
              // check every element of array
              for (let i = 0; i < value.length; i++) {
                err = t.__exec__(i, value[i], paths);
                if (err) {
                  break;
                }
              }
              break;
            case utils.isPlainObject(t) || Array.isArray(t): // [{name: type.string}]
              // check one by one element
              (function() {
                const s = new Struct(t, paths);
                for (let i = 0; i < value.length; i++) {
                  s.paths = s.paths.concat(i);
                  err = s.validate(value[i]);
                  s.paths.pop();
                  if (err) {
                    break;
                  }
                }
              })();
              break;
            case typeof t === 'function':
              (function() {
                for (let i = 0; i < value.length; i++) {
                  const taskName = 'customFunction()';
                  t.__name__ = taskName;
                  const newType = new Type();
                  newType.task.push(t);
                  newType.raw.push(taskName);
                  err = newType.__exec__(field, value[i], this.paths);
                  if (err) {
                    break;
                  }
                }
              }.call(this));
              break;
            default:
              return new TypeError('array', paths, value);
          }

          break;
        // if type is an object
        case utils.isPlainObject(type):
          const s = new Struct(type, paths);
          err = s.validate(value);
          break;
        case typeof type === 'function':
          const taskName = 'customFunction()';
          type.__name__ = taskName;
          const newType = new Type();
          newType.task.push(type);
          newType.raw.push(taskName);
          err = newType.__exec__(field, value, this.paths);
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
