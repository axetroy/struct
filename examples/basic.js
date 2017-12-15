const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18
};

const struct = Struct({
  name: type.string,
  age: type.int
});

const err = struct.validate(data);

console.log(err);
