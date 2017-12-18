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
* [x] Strict mode, no one excess field.
* [x] Most of type validator support.
* [x] Scalable, easy to define your customize validator.
* [x] Highly customizable.
* [x] Validate with params, Support pass the argument to the validator.
* [x] Pipe line, multiple validator work together.
* [x] Support endless nest object, including Object and Array.
* [x] Clear error message.
* [x] Support nest Struct

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

const User = Struct({
  name: type.string,
  age: type.int,
  address: {
    city: type.string,
    code: type.int
  }
});

const err = User.validate(data);

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

const User = new Struct({
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

const err = User.validate(data);

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

define a customize type, will add an property on `type.prototype`

#### type.xxx

```javascript
const stringType = type.string;
const intType = type.int;
const composingType = type.int.gte(100);
```

| Validator               | Description                               | Require Argument | Source Code                                                                                   |
| ----------------------- | ----------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| **number**              | Check the type is a number                | false            | [src/validator/number](https://github.com/axetroy/struct/blob/master/src/validator/number.js) |
| **int**                 | Check the type is a int                   | false            | [src/validator/int](https://github.com/axetroy/struct/blob/master/src/validator/int.js)       |
| **float**               | Check the type is a float                 | false            | [src/validator/float](https://github.com/axetroy/struct/blob/master/src/validator/float.js)   |
| **string**              | Check the type is a string                | false            | [src/validator/string](https://github.com/axetroy/struct/blob/master/src/validator/string.js) |
| **bool**                | Check the type is a bool                  | false            | [src/validator/bool](https://github.com/axetroy/struct/blob/master/src/validator/bool.js)     |
| **any**                 | Any type                                  | false            | [src/validator/any](https://github.com/axetroy/struct/blob/master/src/validator/any.js)       |
| **odd**                 | Check the type is a number and odd        | false            | [src/validator/odd](https://github.com/axetroy/struct/blob/master/src/validator/odd.js)       |
| **even**                | Check the type is a number and even       | false            | [src/validator/even](https://github.com/axetroy/struct/blob/master/src/validator/even.js)     |
| **json**                | Check the type is json string             | false            | [src/validator/json](https://github.com/axetroy/struct/blob/master/src/validator/json.js)     |
| **eq(value)**           | Equal to some value                       | true             | [src/validator/eq](https://github.com/axetroy/struct/blob/master/src/validator/eq.js)         |
| **gt(number)**          | Greater then a number                     | true             | [src/validator/gt](https://github.com/axetroy/struct/blob/master/src/validator/gt.js)         |
| **gte(number)**         | Greater then or equal a number            | true             | [src/validator/gte](https://github.com/axetroy/struct/blob/master/src/validator/gte.js)       |
| **lt(number)**          | Less then a number                        | true             | [src/validator/lt](https://github.com/axetroy/struct/blob/master/src/validator/lt.js)         |
| **lte(number)**         | Less then or equal a number               | true             | [src/validator/lte](https://github.com/axetroy/struct/blob/master/src/validator/lte.js)       |
| **bt(min, max)**        | Between the min and max                   | true             | [src/validator/bt](https://github.com/axetroy/struct/blob/master/src/validator/bt.js)         |
| **in(array)**           | The value is in the array                 | true             | [src/validator/in](https://github.com/axetroy/struct/blob/master/src/validator/in.js)         |
| **len(int)**            | The values's length property equal to xxx | true             | [src/validator/len](https://github.com/axetroy/struct/blob/master/src/validator/len.js)       |
| **msg(message)**        | Custom error message of this field        | true             | [src/validator/msg](https://github.com/axetroy/struct/blob/master/src/validator/msg.js)       |
| **func(validatorFunc)** | Custom Validator                          | true             | [src/validator/func](https://github.com/axetroy/struct/blob/master/src/validator/func.js)     |

All the validator is define on `type.prototype`.

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
* [Composing Struct](https://github.com/axetroy/struct/blob/master/examples/struct-nest.js)
* [Composing Struct In Array](https://github.com/axetroy/struct/blob/master/examples/struct-nest-array.js)
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
