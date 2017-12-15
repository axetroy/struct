const { Struct, type } = require('../index');

const data1 = {
  name: 'axetroy',
  age: 18,
  country: {
    name: 'China',
    province: {
      name: 'You Guess',
      city: {
        name: 'The capital of the province',
        street: {
          name: 'suburbs',
          number: {
            code: 100031,
            owner: 'Axetroy',
            family: [
              { name: 'daddy' },
              { name: 'mom' },
              { name: 'brother' },
              { name: 'sister' }
            ]
          }
        }
      }
    }
  }
};

const data2 = {
  name: 'axetroy',
  age: 18,
  country: {
    name: 'China',
    province: {
      name: 'You Guess',
      city: {
        name: 'The capital of the province',
        street: {
          name: 'suburbs',
          number: {
            code: 100031,
            owner: 'Axetroy',
            family: [
              { name: 'daddy' },
              { name: 'mom' },
              { name: 'brother' },
              { name: 123 } // the different between data1 and data2
            ]
          }
        }
      }
    }
  }
};

const struct = Struct({
  name: type.string,
  age: type.int,
  country: {
    name: type.string,
    province: {
      name: type.string,
      city: {
        name: type.string,
        street: {
          name: type.string,
          number: {
            code: type.int,
            owner: type.string,
            family: [
              {
                name: type.string
              }
            ]
          }
        }
      }
    }
  }
});

const err1 = struct.validate(data1);

console.log(err1); // undefined

const err2 = struct.validate(data2);

console.log(err2);
console.log(err2.validator); // string
console.log(err2.path); // [ 'country','province','city','street','number','family',3,'name' ]
console.log(err2.value); // 123
console.log(err2.message); // 'Can not pass the validator "string" with value "123" in path "country.province.city.street.number.family.3.name"'
