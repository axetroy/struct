const Struct = require('../index');

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
  name: Struct.type.string,
  age: Struct.type.int.gt(18) // check int first, and then check gt
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
