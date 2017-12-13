const { Struct, type } = require('../index');

// must name with xxx()
Struct.define('gt()', function(argv) {
  return function(input) {
    return input > argv;
  };
});

const data = {
  name: 'axetroy',
  age: 19
};

const struct = Struct({
  name: type.string,
  age: type.int.gt(18) // check int first, and then check gt
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
