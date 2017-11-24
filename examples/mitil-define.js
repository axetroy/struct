const Struct = require('../index');

const data = {
  name: "axetroy",
  age: 20
};

const struct = truct({
  name: Struct.type.string,
  age: Struct.type.int.gte(18).lte(50)  // 18 <= age <= 50
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
