const test = require('ava');
const even = require('./even');

test('.even()', t => {
  t.true(even(10));
  t.true(even(0));
  t.true(even(2));

  t.false(even(1));
  t.false(even(-1));
  t.false(even(0.1));
  t.false(even(-0.1));

  // not a number, should all false
  t.false(even(NaN));
  t.false(even(true));
  t.false(even('0'));
});
