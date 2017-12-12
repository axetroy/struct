(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Struct"] = factory();
	else
		root["Struct"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isString(input) {
  return typeof input === 'string' || input instanceof String;
}

function isNumber(input) {
  return !isNaN(input) && (typeof input === 'number' || input instanceof Number);
}

function isFunction(input) {
  return typeof input === 'function';
}

function isPlainObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

module.exports.isString = isString;
module.exports.isNumber = isNumber;
module.exports.isFunction = isFunction;
module.exports.isPlainObject = isPlainObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function TypeError(validateName) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var value = arguments[2];

  if (this instanceof TypeError === false) {
    return new TypeError(validateName);
  }
  this.validator = validateName;
  this.keys = keys;
  this.value = value;
  this.message = "Can not pass the validator " + validateName + " by " + value;
}

TypeError.prototype = new Error();
TypeError.prototype.constructor = TypeError;

module.exports = TypeError;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var TypeError = __webpack_require__(1);

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
Type.prototype.__exec__ = function (key, val) {
  var parentKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var tasks = [].concat(this.task);
  while (tasks.length) {
    var task = tasks.shift();
    var validator = task.__name__;
    var result = task.call(this, val);
    if (result === false || result instanceof TypeError) {
      return new TypeError(validator, parentKeys.concat(key), val);
    }
  }
};

/**
 * define a checker
 * @param name
 * @param checker
 */
Type.define = function (name, checker) {
  if (utils.isFunction(checker) === false) {
    throw new Error('The argument must be 1: string, 2: function');
  }
  var isFunctional = /\w+\(\)$/.test(name); // which name like this .gte()
  var property = name.replace(/\(\)$/, '');
  Object.defineProperty(Type.prototype, property, {
    enumerable: true,
    configurable: false,
    get: function get() {
      var _this = this;

      if (isFunctional === true) {
        return function (argv) {
          var func = checker.call(_this, argv);
          func.__name__ = name;
          _this.raw.push(name);
          _this.task.push(func);
          return _this;
        };
      } else {
        checker.__name__ = name;
        this.raw.push(name);
        this.task.push(checker);
        return this;
      }
    }
  });
};

module.exports = Type;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Type = __webpack_require__(2);
var utils = __webpack_require__(0);
var TypeError = __webpack_require__(1);

function Struct(typer) {
  if (this instanceof Struct === false) {
    return new Struct(typer);
  }
  this.typer = typer;

  if (utils.isPlainObject(typer) === false) {
    throw new Error('Argument of Struct must be an object!');
  }

  for (var attr in typer) {
    if (typer.hasOwnProperty(attr)) {
      var type = typer[attr];
      if (type instanceof Type === false && utils.isPlainObject(type) === false) {
        throw new Error('Invalid type of key ' + attr);
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
Struct.prototype.validate = function (obj) {
  var checked = [];
  var typer = this.typer;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      var type = typer[key];
      // if this key is not define the type then skip
      if (!type) {
        return new TypeError('undefined', [key], undefined);
      }
      var err = type.__exec__(key, value, []);
      checked.push(key);
      if (err) {
        return err;
      }
    }
  }

  var _loop = function _loop(_key) {
    if (typer.hasOwnProperty(_key)) {
      // have someone key not check
      if (checked.findIndex(function (v) {
        return v === _key;
      }) < 0) {
        return {
          v: new TypeError('require', [_key], undefined)
        };
      }
    }
  };

  for (var _key in typer) {
    var _ret = _loop(_key);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
Struct.define('string', __webpack_require__(5));
Struct.define('number', __webpack_require__(6));
Struct.define('int', __webpack_require__(7));
Struct.define('float', __webpack_require__(8));
Struct.define('odd', __webpack_require__(9));
Struct.define('even', __webpack_require__(10));
Struct.define('json', __webpack_require__(11));

// functional check
Struct.define('object()', __webpack_require__(12));
Struct.define('array()', __webpack_require__(13));
Struct.define('eq()', __webpack_require__(14));
Struct.define('gt()', __webpack_require__(15));
Struct.define('gte()', __webpack_require__(16));
Struct.define('lt()', __webpack_require__(17));
Struct.define('lte()', __webpack_require__(18));
Struct.define('bt()', __webpack_require__(19));
Struct.define('in()', __webpack_require__(20));

Object.defineProperty(Struct, 'type', {
  enumerable: false,
  configurable: false,
  get: function get() {
    return new Type();
  }
});

module.exports = Struct;
module.exports.default = Struct;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a string or not
 * @param input
 * @returns {boolean}
 */
function isString(input) {
  return utils.isString(input);
}

module.exports = isString;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a number or not
 * @param input
 * @returns {boolean}
 */
function isNumber(input) {
  return utils.isNumber(input);
}

module.exports = isNumber;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a int or not
 * @param input
 * @returns {boolean}
 */
function isInt(input) {
  return utils.isNumber(input) && (input + '').indexOf('.') < 0;
}

module.exports = isInt;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a float number or not
 * @param input
 * @returns {boolean}
 */
function isFloat(input) {
  return utils.isNumber(input) && (input + '').indexOf('.') >= 0;
}

module.exports = isFloat;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a odd number or not
 * @param input
 * @returns {boolean}
 */
function isOdd(input) {
  return utils.isNumber(input) && input % 2 !== 0;
}

module.exports = isOdd;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a even number or not
 * @param input
 * @returns {boolean}
 */
function isEven(input) {
  return utils.isNumber(input) && input % 2 === 0;
}

module.exports = isEven;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = __webpack_require__(0);
/**
 * check the type is a json string or not
 * @param input
 * @returns {boolean}
 */
function isJson(input) {
  if (utils.isString(input) === false) {
    return false;
  }
  try {
    var d = JSON.parse(input);
    return (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object';
  } catch (err) {
    return false;
  }
}

module.exports = isJson;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var TypeError = __webpack_require__(1);
/**
 * create a nest stuct
 * @param types
 * @returns {Function}
 */
function objectabc(types) {
  return function objectChecker(input) {
    if (utils.isPlainObject(input) === false) {
      return new TypeError('argument', undefined, input);
    }
    for (var key in input) {
      if (input.hasOwnProperty(key)) {
        var value = input[key];
        var type = types[key];
        if (!type) {
          continue;
        }
        var err = type.__exec__(key, value);
        if (err) {
          return err;
        }
      }
    }
  };
}

module.exports = objectabc;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var TypeError = __webpack_require__(1);
var Type = __webpack_require__(2);
/**
 * create a nest stuct of a array
 * @param type
 * @returns {Function}
 */
function array(type) {
  if (type instanceof Type === false) {
    return new TypeError('argument', [], type);
  }
  return function objectChecker(input) {
    if (Array.isArray(input) === false) {
      return new TypeError('array', [], input);
    }

    for (var i = 0; i < input.length; i++) {
      var value = input[i];
      var err = type.__exec__(i, value);
      if (err) {
        return err;
      }
    }
  };
}

module.exports = array;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * check the type is equal a value without deepEqual
 * @param value
 * @returns {boolean}
 */
function eq(value) {
  return function (input) {
    return input === value;
  };
}

module.exports = eq;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a great then a number or not
 * @param maxNumber
 * @returns {boolean}
 */
function gt(maxNumber) {
  return function (input) {
    return utils.isNumber(input) && input > maxNumber;
  };
}

module.exports = gt;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a great then a number or equal
 * @param maxNumber
 * @returns {boolean}
 */
function gte(maxNumber) {
  return function (input) {
    return utils.isNumber(input) && input >= maxNumber;
  };
}

module.exports = gte;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a less then a number
 * @param minNumber
 * @returns {boolean}
 */
function lt(minNumber) {
  return function (input) {
    return utils.isNumber(input) && input < minNumber;
  };
}

module.exports = lt;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 * check the type is a less then a number
 * @param minNumber
 * @returns {boolean}
 */
function lte(minNumber) {
  return function (input) {
    return utils.isNumber(input) && input <= minNumber;
  };
}

module.exports = lte;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
/**
 *
 * @param minNumber
 * @param maxNumber
 * @returns {Function}
 */
function isBetween(minNumber, maxNumber) {
  return function (input) {
    return utils.isNumber(input) && input > minNumber && input < maxNumber;
  };
}

module.exports = isBetween;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * check the type is a less then a number
 * @param array
 * @returns {boolean}
 */
function isIn() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return function (input) {
    return array.findIndex(function (v) {
      return input === v;
    }) >= 0;
  };
}

module.exports = isIn;

/***/ })
/******/ ]);
});