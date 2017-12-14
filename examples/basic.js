const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    cityCode: '12'
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: type.object({
    cityCode: type.int
  })
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
