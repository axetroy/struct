const test = require('ava');
const float = require('./float');

test('.float()', t => {
  t.false(float(10));
  t.false(float(0));
  t.false(float(-1));
  t.true(float(0.1));
  t.true(float(-0.1));
  t.false(float(NaN));
  t.false(float(false));
  t.false(float('0'));
});
