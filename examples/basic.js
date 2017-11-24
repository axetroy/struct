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
