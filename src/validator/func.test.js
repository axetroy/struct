const test = require('ava');
const func = require('./func');
const { Type } = require('../type');
const TypeError = require('../error');

test('.gt()', t => {
  const type = new Type();

  t.true(
    func.call(type, function(input) {
      return typeof input === 'string';
    })('this is a string')
  );

  t.deepEqual(type.raw, ['func()']);
  t.deepEqual(type.task.length, 1);

  const err1 = type.__exec__('root', 'string');
  t.deepEqual(err1, void 0);

  const err2 = type.__exec__('root', 123123);
  t.true(err2 instanceof TypeError);
});
