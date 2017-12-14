const test = require('ava');
const lt = require('./lt');

test('.lt()', t => {
  t.true(lt(10)(9));
  t.true(lt(0)(-1));

  // not a number
  t.false(lt(-1)('-2'));
  t.false(lt(-1)(NaN));
  t.false(lt(-1)(false));
});
