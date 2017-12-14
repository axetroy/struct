const test = require('ava');
const isIn = require('./in');

test('.isIn()', t => {
  t.true(isIn(['a', 'b', 'c'])('a'));
  t.true(isIn(['a', 'b', 'c'])('b'));
  t.true(isIn(['a', 'b', 'c'])('c'));
  t.true(isIn([1, 2, 3])(1));
  t.true(isIn([1, 2, 3])(2));
  t.true(isIn([1, 2, 3])(3));
  t.true(isIn([true, false])(true));
  t.true(isIn([true, false])(false));

  // undefined
  t.false(isIn()());

  // not support NaN
  t.false(isIn([NaN, 0])(NaN));
});
