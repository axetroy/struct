const { Struct, type } = require('../index');

const data = {
  name: 'Struct',
  contributors: [
    {
      name: 'Axetroy',
      age: '18'
    }
  ]
};

const User = Struct({
  name: type.string,
  age: type.int
});

const Project = Struct({
  name: type.string,
  contributors: [User]
});

const err = Project.validate(data);

console.log(err);
console.log(err.path); // [ 'author', 'age' ]
console.log(err.validator); // 'int'
console.log(err.value); // '18'
