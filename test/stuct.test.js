import test from 'ava';
import Struct from '../index';

test('type.isString', t => {
  const s = new Struct({
    name: Struct.type.isString
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

test('type.isNumber', t => {
  const s = new Struct({
    count: Struct.type.isNumber
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

test('type.isInt', t => {
  const s = new Struct({
    age: Struct.type.isInt
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
