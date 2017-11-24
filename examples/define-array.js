const Struct = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  friends: ['ada', 'judy', 'kim']
};

const struct = truct({
  name: Struct.type.string,
  age: Struct.type.int,
  friends: Struct.type.array(Struct.type.string)
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
