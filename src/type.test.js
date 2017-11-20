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

  const type = new Type();

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
