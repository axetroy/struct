const test = require('ava');
const eq = require('./eq');

test('.eq()', t => {
  t.true(eq(3)(3));
  t.true(eq('3')('3'));
  t.false(eq('3')(3));
  t.false(eq('true')(true));
  t.false(eq(false)(true));
});
