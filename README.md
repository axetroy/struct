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

A Modern, Scalable , Graceful, Easy Use data structure validator

## Quick start

```npm
# not publish yet
npm install @axetroy/struct
```

```javascript
const Struct = require('../index');

const data = {
  name: "axetroy",
  age: 18
};

const struct = truct({
  name: Struct.type.string,
  age: Struct.type.int
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
```

### examples

There is the examples, may be it can help you

### How to write a custom validator

```bash

```

### TODO

- [ ] Support browser, pack with Webpack

## Contributing

[Contributing Guid](https://github.com/axetroy/struct/blob/master/CONTRIBUTING.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/Github/commits?author=axetroy) [🐛](https://github.com/axetroy/struct/issues?q=author%3Aaxetroy) 🎨 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fstruct.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fstruct?ref=badge_large)
