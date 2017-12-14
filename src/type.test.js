const test = require('ava');
const { Type } = require('./type');
const TypeError = require('./error');

test('new Type()', t => {
  const type = new Type();

  t.deepEqual(type.constructor, Type);
  t.deepEqual(type.task, []);
  t.deepEqual(type.raw, []);
  t.notThrows(function() {
    type.__exec__();
  });
  t.deepEqual(type.__exec__(), void 0);
});

test('new Type() and define', t => {
  const type = Type();

  t.deepEqual(type.task, []);
  t.deepEqual(type.raw, []);

  // set string checker
  type.string;

  t.deepEqual(type.task.length, 1);
  t.deepEqual(type.raw.length, 1);
  t.notThrows(function() {
    type.__exec__('key', 'This is a string, it should be ok');
  });
  t.throws(function() {
    // check a number as a string, it should throw an error
    const err = type.__exec__('key', 1234);
    if (err) {
      throw err;
    }
  });

  // set int checker
  type.int;

  t.deepEqual(type.task.length, 2);
  t.deepEqual(type.raw.length, 2);
});

// test('define checker with invalid argument', t => {
//   t.throws(function() {
//     Type.define('hello', null);
//   }, `The argument must be 1: string, 2: function`);
// });

test('Type Error', t => {
  const checker = 'int';
  const err = TypeError(checker, ['key'], '123');
  t.true(err instanceof Error);
});
