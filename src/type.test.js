const test = require('ava');
const Type = require('./type');

test('new Type()', t => {
  const type = new Type();

  t.deepEqual(type.constructor, Type);
  t.deepEqual(type.task, []);
  t.deepEqual(type.raw, []);
  t.notThrows(function() {
    type.__exec__();
  });
  t.true(type.__exec__());
});

test('new Type() and define', t => {
  Type.define('string', require('./check/string'));
  Type.define('int', require('./check/int'));

  const type = Type();

  t.deepEqual(type.task, []);
  t.deepEqual(type.raw, []);

  // set string checker
  type.string;

  t.deepEqual(type.task.length, 1);
  t.deepEqual(type.raw.length, 1);
  t.notThrows(function() {
    type.__exec__('This is a string, it should be ok');
  });
  t.throws(function() {
    // check a number as a string, it should throw an error
    type.__exec__(1234);
  });

  // set int checker
  type.int;

  t.deepEqual(type.task.length, 2);
  t.deepEqual(type.raw.length, 2);
});

test('define checker with invalid argument', t => {
  t.throws(function() {
    Type.define('hello', null);
  }, `The argument must be 1: string, 2: function`);
});

test('Type Error', t => {
  const checker = 'int';

  const err = Type.Error(checker);

  t.deepEqual(err.message, `Can not pass the validator ${checker}`);
  t.true(err instanceof Error);
});
