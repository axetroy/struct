const { Struct, type } = require('../index');

const data1 = {
  name: 'Axetroy',
  friends: [
    {
      name: 'Aaron',
      friends: [
        {
          name: 'Ben',
          friends: [{ name: 'Bill' }]
        },
        {
          name: 'George',
          friends: [{ name: 'Isaiah' }]
        }
      ]
    },
    {
      name: 'Bruce',
      friends: [
        {
          name: 'Cheney',
          friends: [{ name: 'Derek' }, { name: 'Kenneth' }]
        }
      ]
    }
  ]
};

const data2 = {
  name: 'Axetroy',
  friends: [
    {
      name: 'Aaron',
      friends: [
        {
          name: 'Ben',
          friends: [{ name: 'Bill' }]
        },
        {
          name: 'George',
          friends: [{ name: 'Isaiah' }]
        }
      ]
    },
    {
      name: 'Bruce',
      friends: [
        {
          name: 'Cheney',
          friends: [{ name: 'Derek' }, { name: 123 }] // the different between data1 and data2
        }
      ]
    }
  ]
};

const struct = Struct({
  name: type.string,
  friends: [
    {
      name: type.string,
      friends: [
        {
          name: type.string,
          friends: [{ name: type.string }]
        }
      ]
    }
  ]
});

const err1 = struct.validate(data1);

console.log(err1); // undefined

const err2 = struct.validate(data2);

console.log(err2);
console.log(err2.validator); // string
console.log(err2.path); // [ 'friends', 1, 'friends', 0, 'friends', 1, 'name' ]
console.log(err2.value); // 123
console.log(err2.message); // 'Can not pass the validator "string" with value "123" in path "friends.1.friends.0.friends.1.name"'
