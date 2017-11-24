const Struct = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  hometown: {
    city: 'Nan Ning',
    code: 10086
  }
};

const struct = truct({
  name: Struct.type.string,
  age: Struct.type.int,
  hometown: {
    city: Struct.type.string,
    code: Struct.type.int
  }
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
