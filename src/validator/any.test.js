const test = require('ava');
const any = require('./any');

test('.any', t => {
  t.true(any(1));
  t.true(any(0));
  t.true(any(true));
  t.true(any(false));
});
