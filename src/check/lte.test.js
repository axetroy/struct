const test = require('ava');
const lte = require('./lte');

test('.lte()', t => {
  t.true(lte(10)(9));
  t.true(lte(0)(-1));
  t.true(lte(0)(0));
  t.true(lte(1)(1));
  t.true(lte(-1)(-1));

  // not a number
  t.false(lte(-1)('-2'));
  t.false(lte(-1)(NaN));
  t.false(lte(-1)(false));
});
