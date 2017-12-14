const test = require('ava');
const string = require('./string');

test('.string()', t => {
  t.true(string('0'));
  t.true(string('123'));
  t.true(string('false'));
  t.true(string('NaN'));

  t.false(string(-1));
  t.false(string(0.1));
  t.false(string(-0.1));
  t.false(string(NaN));
  t.false(string(false));
});
