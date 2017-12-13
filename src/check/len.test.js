const test = require('ava');
const len = require('./len');

test('.len()', t => {
  t.true(len(0)([]));
  t.true(len(5)([1, 2, 3, 4, 5]));
  t.true(len(4)([1, 2, 3, 4]));
  t.true(len(3)([1, 2, 3]));
  t.true(len(2)([1, 2]));
  t.true(len(1)([1]));
  t.true(len(0)(''));
  t.true(len(0)(NaN));
  t.true(len(0)(NaN));
});
