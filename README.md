## Struct

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/struct.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/struct.svg?branch=master)](https://travis-ci.org/axetroy/struct)
[![Coverage Status](https://coveralls.io/repos/github/axetroy/struct/badge.svg?branch=master)](https://coveralls.io/github/axetroy/struct?branch=master)
[![Dependency](https://david-dm.org/axetroy/struct.svg)](https://david-dm.org/axetroy/struct)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=6.0-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/%40axetroy%2Fstruct.svg)](https://badge.fury.io/js/%40axetroy%2Fstruct)
![Size](https://github-size-badge.herokuapp.com/axetroy/struct.svg)

A Modern, Scalable , Graceful, Easy Use data structure validator, Support browser and NodeJs

* [x] All in Javascript. No Magic string.
* [x] Strict mode, no one excess field
* [x] Most of type validator support.
* [x] Scalable, easy to define your customize validator.
* [x] Highly customizable.
* [x] Validate with params, Support pass the argument to the validator.
* [x] Pipe line, multiple validator work together.
* [x] Support endless nest object, including Object and Array.
* [x] Clear error message.

## Quick start

```npm
npm install @axetroy/struct --save
```

```javascript
const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: '12' // invalid city code
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: {
    city: type.string,
    code: type.int
  }
});

const err = struct.validate(data);

console.log(err); // if all validator success, the error should be undefined

/**
{ Error
    at Object.<anonymous> (/home/axetroy/gpm/github.com/axetroy/struct/src/error.js:19:23)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Module.require (module.js:579:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/home/axetroy/gpm/github.com/axetroy/struct/src/type.js:2:19)
    at Module._compile (module.js:635:30)
  validator: 'int',
  path: [ 'address', 'code' ],
  value: '12',
  detail: 'Can not pass the validator "int" with value "12" in path "address.code"',
  message: 'Can not pass the validator "int" with value "12" in path "address.code"' }
 */
```

### Advanced usage

```javascript
const { Struct, type } = require('@axetroy/struct');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: 100
  },
  message: [
    { from: 'marry', msg: 'How are you?', timestamp: 1513155028 },
    { from: 'henry', msg: "How's going one?", timestamp: 1513135028 }
  ]
};

const struct = new Struct({
  name: type.string,
  age: type.int.gte(18), // age is int && and age >= 18
  address: {
    city: type.string,
    code: type.int.gte(100)
  },
  message: [
    {
      from: type.string,
      msg: type.string,
      timestamp: type.int
    }
  ]
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

## Document

### class: Struct

Create a struct

```javascript
const { Struct, type } = require('@axetroy/struct');

const struct1 = new Struct(type.string);
const struct2 = Struct(type.string);
```

#### static [Struct.define](#static-typedefinevalidatorname-handler)
#### static [Struct.Type](#class-type)

#### struct.validate(data)

* `data`: <\*>
* returns: <Undefined | [TypeError](#class-typeerror)>

```javascript
const err = Struct.validate({ word: 'Hello world' });
```

validate the data is match with struct, if all match. return `undefined`, if not, return an [`TypeError`](#class-typeerror)

### class: Type

Create a type

#### static: Type.define(validatorName, handler)

* validatorName: <String>
* handler: <(input):bool | (argv):(input):bool>

```javascript
Type.define('email', function(input) {
  // here to check is it a email string
  return true;
});

```

define a customize type, will add an property on ``type.prototype``

#### type.xxx

```javascript
const stringType = type.string;
const intType = type.int;
const composingType = type.int.gte(100);
```

Here is the build in type

* [x] **number**
* [x] **int**
* [x] **float**
* [x] **string**
* [x] **bool**
* [x] **any**
* [x] **odd**
* [x] **even**
* [x] **json**
* [x] **object(object)**
* [x] **array(type)**
* [x] **eq(value)**
* [x] **gt(number)**
* [x] **gte(number)**
* [x] **lt(number)**
* [x] **lte(number)**
* [x] **bt(minNumber, maxNumber)**
* [x] **in(array)**
* [x] **len(int)**
* [x] **msg(message)**
* [x] **func(validatorFunc)**

All the validator is define on ``type.prototype``.

### class: TypeError

* **validator**: What validator fail
* **path**: What key not pass the validator
* **value**: The value which not pass the validator
* **message**: The error message
* **detail**: The error message

The TypeError inherit from Error

### Examples

* [Basic Validation](https://github.com/axetroy/struct/blob/master/examples/basic.js)
* [Custom Validator](https://github.com/axetroy/struct/blob/master/examples/constom-validator.js)
* [Custom Validator With Argument](https://github.com/axetroy/struct/blob/master/examples/custom-functional-validator.js)
* [Custom Validator Function](https://github.com/axetroy/struct/blob/master/examples/custom-validator-function.js)
* [Custom Validator Function With Type](https://github.com/axetroy/struct/blob/master/examples/custom-validator-function-type.js)
* [Composing Validator](https://github.com/axetroy/struct/blob/master/examples/custom-validator.js)
* [Custom Error Message](https://github.com/axetroy/struct/blob/master/examples/custom-error-message.js)
* [Deep Nest Object](https://github.com/axetroy/struct/blob/master/examples/validate-deep-nest-object.js)
* [Deep Nest Array](https://github.com/axetroy/struct/blob/master/examples/validate-deep-nest-array.js)

There is the [examples](https://github.com/axetroy/struct/tree/master/examples), may be it can help you

## Contributing

[Contributing Guid](https://github.com/axetroy/struct/blob/master/CONTRIBUTING.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/Github/commits?author=axetroy) [🐛](https://github.com/axetroy/struct/issues?q=author%3Aaxetroy) 🎨 |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fstruct.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fstruct?ref=badge_large)
