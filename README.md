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

console.log(err); // if all validator success, the error should be null

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

### API

#### new Struct(object)

Create a struct

#### Stuct.type.xxx

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

#### Struct.validate(data)

Check the data is valid or not

#### What will **new Struct.validate(value)** return?

* **undefined**, If you got this return value, that mean the data pass the all validator
* **TypeError**, if anyone validator fail, it will return this error, inherit from Error
  * **validator**: What validator fail
  * **path**: What key not pass the validator
  * **value**: The value which not pass the validator
  * **message**: The error message
  * **detail**: The error message

### How to define customized error message?

```javascript
const Struct = require('@axetroy/struct');

const data = {
  name: 'axetroy',
  age: 17 // 17 < 18, it will throw an error
};

const struct = Struct({
  name: type.string,
  age: type.int.gte(18).msg('Must be an adult')
});

const err = struct.validate(data);

console.error(err.message); // 'Must be an adult'
```

### How to write a custom validator?

```javascript
const Struct = require('../index');

Struct.define('email', function(input) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
    input
  );
});

const data = {
  name: 'axetroy',
  age: 18,
  email: 'xxx@axetroy.com'
};

const struct = truct({
  name: type.string,
  age: type.int,
  email: type.string.email // check string first, and then check email
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

### Examples

* [Basic Validation](https://github.com/axetroy/struct/blob/master/examples/basic.js)
* [Custom Validator](https://github.com/axetroy/struct/blob/master/examples/constom-validator.js)
* [Custom Validator With Argument](https://github.com/axetroy/struct/blob/master/examples/constom-functional-validator.js)
* [Composing Validator](https://github.com/axetroy/struct/blob/master/examples/composing-validator.js)
* [Custom Error Message](https://github.com/axetroy/struct/blob/master/examples/constom-error-message.js)
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
