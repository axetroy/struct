import test from 'ava';
import Struct from './struct';
import Type from './type';

test('basic stuct', t => {
  const s = new Struct({
    name: Struct.type.string
  });

  t.notThrows(function() {
    s.validate({
      name: 'aaa'
    });
  });

  t.throws(function() {
    s.validate({
      name: 123
    });
  });
});

// test('basic nest stuct', t => {
//   const s = Struct({
//     name: Struct.type.string,
//     info: Struct.type.object({
//       age: Struct.type.int
//     })
//   });
//
//   t.notThrows(function() {
//     s.validate({
//       name: 'aaa',
//       info: {
//         age: 18
//       }
//     });
//   });
//
//   t.throws(function() {
//     s.validate({
//       name: 'aaa',
//       info: {
//         age: '18' // invalid age field
//       }
//     });
//   });
// });

test('object nest object', t => {
  const s = Struct({
    name: Struct.type.string,
    info: Struct.type.object({
      age: Struct.type.int,
      location: Struct.type.object({
        x: Struct.type.int,
        y: Struct.type.int
      })
    })
  });

  t.notThrows(function() {
    s.validate({
      name: 'aaa',
      info: {
        age: 18,
        location: {
          x: 1,
          y: 1
        }
      }
    });
  });

  t.throws(function() {
    s.validate({
      name: 'aaa',
      info: {
        age: 18,
        location: {
          x: '1', // invalid type
          y: 1
        }
      }
    });
  }, new Type.Error('int').message);
});

test('invalid type field', t => {
  t.throws(function() {
    const s = Struct({
      name: '123' // invalid type
    });
  });
});

test('skip the field which did not define', t => {
  t.notThrows(function() {
    const s = Struct({
      name: Struct.type.string
    });

    s.validate({
      name: 'axetroy',
      age: 18 // did not define the field
    });
  });
});

test('define custom type', t => {
  // value
  t.notThrows(function() {
    function Data() {
      this.name = 'axetroy';
    }

    Data.prototype.a = '1';

    const s = Struct({
      name: Struct.type.string
    });

    s.validate(new Data());
  });

  // type
  t.notThrows(function() {
    function T() {}

    T.prototype.a = '1';

    const s = Struct(new T());
  });
});
