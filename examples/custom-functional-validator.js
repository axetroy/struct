const { Struct, type } = require('../index');

// must name with xxx()
Struct.define('prefixWith()', function(prefix) {
  return function(input) {
    return input.indexOf(prefix) === 0;
  };
});

const data = {
  name: '[A]axetroy',
  age: 19
};

const struct = Struct({
  name: type.string.prefixWith('[A]'),
  age: type.int
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
