import test from 'ava';
import Struct from '../index';

test('type.string', t => {
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

test('type.number', t => {
  const s = new Struct({
    count: Struct.type.number
  });

  // input int
  t.notThrows(function() {
    s.validate({
      count: 123
    });
  });

  // input float
  t.notThrows(function() {
    s.validate({
      count: 123.123
    });
  });

  // input number object
  t.notThrows(function() {
    s.validate({
      count: Number(123)
    });
  });

  // input string
  t.throws(function() {
    s.validate({
      count: '123'
    });
  });
});

test('type.int', t => {
  const s = new Struct({
    age: Struct.type.int
  });

  // input int
  t.notThrows(function() {
    s.validate({
      age: 123
    });
  });

  // input float, it should throws an error
  t.throws(function() {
    s.validate({
      age: 123.123
    });
  });

  // input number object
  t.notThrows(function() {
    s.validate({
      age: Number(123)
    });
  });

  // input float object
  t.throws(function() {
    s.validate({
      age: Number(123.123)
    });
  });

  // input string and throws an error
  t.throws(function() {
    s.validate({
      age: '123'
    });
  });
});

test('basic', t => {
  const s = new Struct({
    name: Struct.type.string,
    age: Struct.type.int,
    money: Struct.type.gte(10000).int
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
