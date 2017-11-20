const test = require('ava');
const json = require('./json');

test('.json()', t => {
  t.true(json(JSON.stringify({})));
  t.true(json(JSON.stringify([])));
  t.true(json('{}'));
  t.true(json('[]'));
  t.true(json('{"a": 123}'));

  // not a json string
  t.false(json(JSON.stringify(false)));
  t.false(json(JSON.stringify('')));
  t.false(json(JSON.stringify('0')));

  // not a string type should be false
  t.false(json(1));
  t.false(json(0));
  t.false(json([]));
  t.false(json({}));
  t.false(json(false));
  t.false(json(NaN));
});
