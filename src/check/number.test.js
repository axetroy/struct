const test = require('ava');
const number = require('./number');

test('.number()', t => {
  t.true(number(-1));
  t.true(number(0.1));
  t.true(number(-0.1));

  t.false(number(NaN));
  t.false(number(''));
  t.false(number(false));
});
