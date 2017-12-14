const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  friends: ['ada', 'judy', 'kim']
};

const struct = Struct({
  name: type.string,
  age: type.int,
  friends: [type.string]
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
