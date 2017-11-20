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

      // 如果没有定义这个类型，那么跳过
      if (!type) {
        continue;
      }

      try {
        type.__exec__(value);
        // 到这里已经说明检验成功
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
Struct.defined = function(name, func) {
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

Struct.utils = {
  isString(input) {
    return typeof input === 'string' || input instanceof String;
  },
  isNumber(input) {
    return typeof input === 'number' || input instanceof Number;
  },
  isFunction(input) {
    return typeof input === 'function';
  }
};

function Type() {
  if (this instanceof Type === false) {
    return new Type();
  }
  this.task = [];
  this.raw = [];
}

Type.prototype.constructor = Type;
Type.prototype.__exec__ = function(val) {
  // run checker
  const tasks = [].concat(this.task);
  while (tasks.length) {
    const task = tasks.shift();
    const isSuccess = task.call(this, val);
    if (isSuccess === false) {
      throw new Error(`Can not pass the validator ${task.__name__}`);
    }
  }
};

Object.defineProperty(Struct, 'type', {
  enumerable: false,
  configurable: false,
  get: () => new Type()
});

// official checker
Struct.defined('isString', function(input) {
  return typeof input === 'string';
});

Struct.defined('isNumber', function(input) {
  return typeof input === 'number';
});

Struct.defined('isInt', function(input) {
  return typeof input === 'number' && (input + '').indexOf('.') < 0;
});

Struct.defined('gte()', function(maxNumber) {
  return function(input) {
    return typeof input === 'number' && input >= maxNumber;
  };
});

module.exports = Struct;
module.exports.default = Struct;
