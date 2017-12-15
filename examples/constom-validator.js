const { Struct, type } = require('../index');

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

const struct = Struct({
  name: type.string,
  age: type.int,
  email: type.email // use email here
});

const err = struct.validate(data);

console.log(err); // undefined, because the data pass the validator
