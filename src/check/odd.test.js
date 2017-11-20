const test = require('ava');
const odd = require('./odd');

test('.odd()', t => {
  t.false(odd(10));
  t.false(odd(0));
  t.false(odd(2));

  t.true(odd(1));
  t.true(odd(-1));
  t.true(odd(0.1));
  t.true(odd(-0.1));

  // not a number, should all false
  t.false(odd(NaN));
  t.false(odd(true));
  t.false(odd('0'));
});
