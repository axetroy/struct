## Struct

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/struct.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/struct.svg?branch=master)](https://travis-ci.org/axetroy/struct)
![License](https://img.shields.io/badge/license-Apache-green.svg)

A Modern, Scalable , Graceful, Easy Use data structure validator

## Usage

```npm
# not publish yet
npm install @axetroy/struct
```

```javascript
const Struct = require('@axetroy/struct')

const peopleStruct = Struct({
  name: Struct.type.string,
  age: Struct.type.int.gte(18),
  money: Struct.type.lt(10000)
});

// it should pass validate
try{
  peopleStruct.validate({
    name: "axetroy",
    age: 18,
    money: 9999
  })
}catch (err){
  console.error(err);
}

```

### 

## Contributing

[Contributing Guid](https://github.com/axetroy/struct/blob/master/CONTRIBUTING.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/Github/commits?author=axetroy) [🐛](https://github.com/axetroy/struct/issues?q=author%3Aaxetroy) 🎨 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fstruct.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fstruct?ref=badge_large)
