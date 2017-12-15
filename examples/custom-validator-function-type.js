const { Struct, type } = require('../index');

const data = {
  name: 'axetroy',
  age: 18,
  email: 'xxx@axetroy....com' // invalid email
};

const struct = Struct({
  name: type.string,
  age: type.int,
  email: type.func(function(input) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      input
    );
  })
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
