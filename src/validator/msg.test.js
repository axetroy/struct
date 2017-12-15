const test = require('ava');
const msg = require('./msg');

test('.any', t => {
  t.true(msg('自定义错误信息')());
});
