const { Struct, type } = require('../index');

const data = {
  name: 'Axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: 9999
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: {
    city: type.string,
    code: type.int
      .gte(10000)
      .msg('City code must be an number and greater then or equal to 10000')
  }
});

const err = struct.validate(data);

console.log(err.message); // 'City code must be an number and greater then or equal to 10000'
