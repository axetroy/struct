const test = require('ava');
const int = require('./int');

test('.int()', t => {
  t.true(int(10));
  t.true(int(0));
  t.true(int(-1));
  t.false(int(0.1));
  t.false(int(-0.1));
  t.false(int(NaN));
  t.false(int(false));
  t.false(int('0'));
});
