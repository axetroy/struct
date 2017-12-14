const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: '12' // invalid city code
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: type.object({
    city: type.string,
    code: type.int
  })
});

const err = struct.validate(data);

console.log(err); // if all validator success, the error should be null
