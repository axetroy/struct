const test = require('ava');
const between = require('./between');

test('.between()', t => {
  t.true(between(0, 2)(1));
  t.true(between(-1, 1)(0));

  // out of range
  t.false(between(1, 5)(10));

  // not support the type
  t.false(between(1, 5)(false));
  t.false(between(1, 5)(NaN));
  t.false(between(1, 5)(true));
  t.false(between(1, 5)(''));
  t.false(between(1, 5)([]));
  t.false(between(1, 5)({}));
});
