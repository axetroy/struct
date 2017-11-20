const test = require('ava');
const gt = require('./gt');

test('.gt()', t => {
  t.true(gt(10)(11));
  t.true(gt(-1)(0));

  // not a number
  t.false(gt('1')(-1));
  t.false(gt(NaN)(0));
  t.false(gt(false)(0));
});
