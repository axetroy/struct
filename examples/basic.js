const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  address: {
    city: 'DC',
    code: 123 // invalid city code,
  },
  // ads: [9, 8, 7, 6, 5, 4, 3, 2, 1],
  friends: [
    {
      name: 'marry',
      age: 22,
      city: 'DB'
    },
    {
      name: 'soe',
      age: 19,
      city: 'CA'
    }
  ]
};

const struct = Struct({
  name: type.string,
  age: type.int,
  address: {
    city: type.string,
    code: type.int
  },
  // ads: [type.int],
  friends: [
    {
      name: type.string,
      age: type.int,
      city: type.string
    }
  ]
});

const err = struct.validate(data);

console.log(err); // if all validator success, the error should be null
