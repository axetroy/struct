const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: 123 // invalid city code
  },
  ads: [9, 8, 7, 6, 5, 4, 3, 2, 1]
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: type.object({
    city: type.string,
    code: type.int
  }),
  ads: type.array(type.int).len(10)
});

const err = struct.validate(data);

console.log(err); // if all validator success, the error should be null
