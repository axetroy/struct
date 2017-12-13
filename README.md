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

## Quick start

```npm
npm install @axetroy/struct
```

```javascript
const Struct = require('@axetroy/struct');

const data = {
  name: 'axetroy',
  age: 18
};

const struct = new Struct({
  name: Struct.type.string,
  age: Struct.type.int
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

### Advanced usage

```javascript
const Struct = require('@axetroy/struct');

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
  name: Struct.type.string,
  age: Struct.type.int.gte(18), // age is int && and age >= 18
  address: Struct.type.object({
    city: Struct.type.string,
    code: Struct.type.int.gte(100)
  }),
  message: Struct.type.array(
    Struct.type.object({
      from: Struct.type.string,
      msg: Struct.type.string,
      timestamp: Struct.type.int
    })
  )
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

### API

#### new Struct(object)

Create a struct

#### Stuct.type.xxx

Get a type

build in type

* [x] **number**, check is a number
* [x] **int**, check is a int
* [x] **float**, check is a float
* [x] **string**, check is a string
* [x] **odd**, check is a odd number
* [x] **even**, check is a even number
* [x] **json**, check ia a json string
* [x] **object(object)**, define nest type
* [x] **array(type)**, define array
* [x] **eq(value)**, check equal something
* [x] **gt(number)**, check a number greater than a number
* [x] **gte(number)**, check a number greater than a number or equal
* [x] **lt(number)**, check a number less than a
* [x] **lte(number)**, check a number less than a number or equal
* [x] **bt(minNumber, maxNumber)**, check a number is between the min number and max number
* [x] **in(array)**, check the value is in one of array

#### Struct.validate(data)

Check the data is valid or not

##### What will **new Struct.validate(value)** return?

* **undefined**, If you got this return value, that mean the data pass the all validator
* **TypeError**, once anyone validator fail, it will return this error object, inherit from Error
  * validator string: What validator fail
  * keys []string: What key not pass the validator
  * value any: The value which not pass the validator
  * message string: The error message

### How to write a custom validator

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
  name: Struct.type.string,
  age: Struct.type.int,
  email: Struct.type.string.email // check string first, and then check email
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

### examples

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
