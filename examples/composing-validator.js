const { Struct, type } = require('../index');

const data = {
  name: 'Axetroy',
  age: 18
};

const struct = Struct({
  name: type.string,
  age: type.int.get(18).lte(60) // define the age>=18 && age<=60
});

const err = struct.validate(data);

console.log(err);
