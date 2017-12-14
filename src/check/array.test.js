const test = require('ava');
const array = require('./array');
const TypeError = require('../error');
const { type } = require('../struct');

test('.array() pure string', t => {
  const err1 = array(type.string)(['a', 'b', 'c', 'd']);
  t.deepEqual(err1, void 0);
});

test('.array()-2', t => {
  const err1 = array(type.int)([1, 2, '3', 4, 5]);
  t.true(err1 instanceof TypeError);
  t.deepEqual(err1.keys, [2]);
  t.deepEqual(err1.value, '3');
  t.deepEqual(err1.validator, 'int');
});

test('.array()-3', t => {
  const err1 = array(type.int)([1, 2, {}]);
  t.true(err1 instanceof TypeError);
  t.deepEqual(err1.keys, [2]);
  t.deepEqual(err1.value, {});
  t.deepEqual(err1.validator, 'int');
});

test('.array() nest object', t => {
  const err1 = array(
    type.object({
      name: type.string,
      age: type.int
    })
  )([
    {
      name: 'axetroy',
      age: 18
    },
    {
      name: 'heri',
      age: 21
    }
  ]);
  t.deepEqual(err1, void 0);
});

test('.array() nest object not pass', t => {
  const err1 = array(
    type.object({
      name: type.string,
      age: type.int
    })
  )([
    {
      name: 'axetroy',
      age: 18
    },
    {
      name: 'heri',
      age: '21' // invalid type
    }
  ]);
  t.true(err1 instanceof TypeError);
  t.deepEqual(err1.keys, [1, 'age']);
  t.deepEqual(err1.value, '21');
  t.deepEqual(err1.validator, 'int');
});

test('.array() invalid type define', t => {
  t.throws(function() {
    // invalid input
    array(null)([
      {
        name: 'axetroy',
        age: 18
      },
      {
        name: 'heri',
        age: '21' // invalid type
      }
    ]);
  });

  t.throws(function() {
    // invalid input
    array([])([
      {
        name: 'axetroy',
        age: 18
      },
      {
        name: 'heri',
        age: '21' // invalid type
      }
    ]);
  });

  t.throws(function() {
    // invalid input
    array({})([
      {
        name: 'axetroy',
        age: 18
      },
      {
        name: 'heri',
        age: '21' // invalid type
      }
    ]);
  });

  t.throws(function() {
    // invalid input
    array(123)([
      {
        name: 'axetroy',
        age: 18
      },
      {
        name: 'heri',
        age: '21' // invalid type
      }
    ]);
  });
});

test('.array() input is or an array', t => {
  // invalid input
  const err1 = array(type.string)({});
  t.true(err1 instanceof TypeError);
  t.deepEqual(err1.keys, []);
  t.deepEqual(err1.value, {});
  t.deepEqual(err1.validator, 'array');
});
