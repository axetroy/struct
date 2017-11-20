import test from 'ava';
import Struct from '../index';

test('basic', t => {
  const s = new Struct({
    name: Struct.type.isString,
    age: Struct.type.isInt,
    money: Struct.type.gte(10000).isInt
  });

  t.notThrows(function() {
    s.validate({
      name: 'aaa',
      age: 18
    });
  });

  // invalid name, name should be a string
  t.throws(function() {
    s.validate({
      name: 123
    });
  });

  // invalid age, age should be a int
  t.throws(function() {
    s.validate({
      age: 123.123
    });
  });

  t.notThrows(function() {
    s.validate({
      money: 10000
    });
  });

  t.throws(function() {
    s.validate({
      money: 10000.1
    });
  });

  // money must gte 10000
  t.throws(function() {
    s.validate({
      money: 9999.999
    });
  });

  t.pass();
});
