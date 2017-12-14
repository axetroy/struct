const test = require('ava');
const bool = require('./bool');

test('.bool', t => {
  t.true(bool(false));
  t.true(bool(true));
  t.true(bool(Boolean()));
  t.true(bool(Boolean(false)));
  t.true(bool(Boolean(true)));
  t.true(bool(Boolean('')));
  t.true(bool(Boolean(1)));
  t.true(bool(Boolean(NaN)));

  t.false(bool('false'));
  t.false(bool('true'));
  t.false(bool(1));
});
