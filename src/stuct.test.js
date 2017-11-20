import test from 'ava';
import Struct from './struct';

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

test('nest stuct', t => {
  const s = Struct({
    name: Struct.type.string,
    info: Struct.type.object({
      age: Struct.type.int,
      address: Struct.type.string
    })
  });
});
