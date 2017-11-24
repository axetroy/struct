const Struct = require('../index');

Struct.define('email', function(input) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
    input
  );
});

const data = {
  name: 'axetroy',
  age: 18,
  email: 'xxx@axetroy.com'
};

const struct = truct({
  name: Struct.type.string,
  age: Struct.type.int,
  email: Struct.type.string.email // check string first, and then check email
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
