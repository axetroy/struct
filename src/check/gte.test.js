const test = require('ava');
const gte = require('./gte');

test('.gte()', t => {
  t.true(gte(10)(11));
  t.true(gte(-1)(0));
  t.true(gte(0)(0));
  t.true(gte(1)(1));
  t.true(gte(-1)(-1));

  // not a number
  t.false(gte('1')(-1));
  t.false(gte(0)(NaN));
  t.false(gte(0)(false));
  t.false(gte(-1)(false));
});
