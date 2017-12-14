const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  hometown: {
    city: 'Nan Ning',
    code: 10086
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  hometown: {
    city: type.string,
    code: type.int
  }
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
