const test = require('ava');
const utils = require('./utils');

test('.isString()', t => {
  t.true(utils.isString(''));
  t.false(utils.isString({}));
  t.false(utils.isString(0));
  t.false(utils.isString(false));
  t.false(utils.isString(NaN));
});

test('.isNumber()', t => {
  t.true(utils.isNumber(0));
  t.false(utils.isNumber(''));
  t.false(utils.isNumber({}));
  t.false(utils.isNumber(false));
  t.false(utils.isNumber(NaN));
});

test('.isFunction()', t => {
  t.true(utils.isFunction(() => {}));
  t.false(utils.isFunction(0));
  t.false(utils.isFunction(''));
  t.false(utils.isFunction({}));
  t.false(utils.isFunction(false));
  t.false(utils.isFunction(NaN));
});

test('.isPlainObject()', t => {
  t.true(utils.isPlainObject({}));
  t.false(utils.isPlainObject([]));
  t.false(utils.isPlainObject(() => {}));
  t.false(utils.isPlainObject(0));
  t.false(utils.isPlainObject(''));
  t.false(utils.isPlainObject(false));
  t.false(utils.isPlainObject(NaN));
});
