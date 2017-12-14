import test from 'ava';
import { Struct, type } from './struct';
import TypeError from './error';

test('basic stuct', t => {
  const s = new Struct({
    name: type.string
  });

  const err1 = s.validate({
    name: 'aaa'
  });

  t.deepEqual(err1, void 0);

  const err2 = s.validate({
    name: 123
  });

  t.true(err2 instanceof TypeError);
  t.deepEqual(err2.validator, 'string');
});

test('basic stuct2', t => {
  const s = new Struct({
    name: type.string
  });

  const err1 = s.validate({
    name: 'aaa'
  });

  t.deepEqual(err1, void 0);

  const err2 = s.validate({
    name: 123
  });

  t.true(err2 instanceof TypeError);
  t.deepEqual(err2.validator, 'string');
});

test('undefined type', t => {
  function CustomizeType() {
    this.name = type.string;
    this.age = type.int;
  }

  CustomizeType.prototype.float = type.float;

  const s = new Struct(new CustomizeType());

  const err1 = s.validate({
    name: 'aaa'
    // age: 22 // undefined value
  });

  t.true(err1 instanceof TypeError);
  t.deepEqual(err1.validator, 'required');
});

test('basic nest stuct', t => {
  const s = Struct({
    name: type.string,
    info: {
      age: type.int
    }
  });

  const err1 = s.validate({
    name: 'aaa',
    info: {
      age: 18
    }
  });

  t.deepEqual(err1, void 0);

  const err2 = s.validate({
    name: 'aaa',
    info: {
      age: '18' // invalid age field
    }
  });
  t.true(err2 instanceof TypeError);
  t.deepEqual(err2.validator, 'int');
});

test('object nest object', t => {
  const s = Struct({
    name: type.string,
    info: {
      age: type.int,
      location: {
        x: type.int,
        y: type.int
      }
    }
  });

  const err1 = s.validate({
    name: 'aaa',
    info: {
      age: 18,
      location: {
        x: 1,
        y: 1
      }
    }
  });

  t.deepEqual(err1, void 0);

  const err2 = s.validate({
    name: 'aaa',
    info: {
      age: 18,
      location: {
        x: '1', // invalid type
        y: 1
      }
    }
  });

  t.true(err2 instanceof TypeError);
  t.deepEqual(err2.validator, 'int');
});

test('invalid type field', t => {
  t.throws(function() {
    const s = Struct({
      name: '123' // invalid type
    });
  });
});

test('will not skip the field which did not define', t => {
  const s = Struct({
    name: type.string
  });

  const err = s.validate({
    name: 'axetroy',
    age: 18 // did not define the field, not allow it
  });

  t.deepEqual(err.keys, ['age']);
  t.deepEqual(err.validator, 'undefined');
  t.deepEqual(err.value, 18);
});

test('define custom type', t => {
  // value
  t.notThrows(function() {
    function Data() {
      this.name = 'axetroy';
    }

    Data.prototype.a = '1';

    const s = Struct({
      name: type.string
    });

    s.validate(new Data());
  });

  // type
  t.notThrows(function() {
    function T() {}

    T.prototype.a = '1';

    const s = Struct(new T());
  });
});

test('Invalid struct argument', t => {
  const msg = 'Invalid struct argument, It can be Type/Object/Array.';
  // invalid struct argument
  t.throws(function() {
    Struct(null);
  }, msg);

  t.throws(function() {
    Struct([]);
  });

  t.throws(function() {
    Struct(0);
  }, msg);

  t.throws(function() {
    Struct(false);
  }, msg);

  t.throws(function() {
    Struct(NaN);
  }, msg);

  t.throws(function() {
    Struct(null);
  }, msg);
});

test('define struct with array Literal-1', t => {
  const s = Struct({
    name: type.string,
    age: type.int,
    nickname: [type.string]
  });

  const err = s.validate({
    name: 'axetroy',
    age: 18,
    nickname: ['axe', 'troy']
  });

  t.deepEqual(err, void 0);

  const err1 = s.validate({
    name: 'axetroy',
    age: 18,
    nickname: 123 // nickname should be an array
  });

  t.deepEqual(err1.keys, ['nickname']);
  t.deepEqual(err1.validator, 'array');
  t.deepEqual(err1.value, 123);

  const err2 = s.validate({
    name: 'axetroy',
    age: 18,
    nickname: ['a', 'b', 'c', 1, 2, 3] // should all element is string, but we got 1,2,3
  });

  t.deepEqual(err2.keys, ['nickname', 3]);
  t.deepEqual(err2.validator, 'string');
  t.deepEqual(err2.value, 1);
});

test('define struct with array Literal-2', t => {
  const s = Struct({
    name: type.string,
    age: type.int,
    nickname: [] // empty element
  });

  const err = s.validate({
    name: 'axetroy',
    age: 18,
    nickname: ['axe', 'troy']
  });

  t.deepEqual(err.keys, ['nickname']);
  t.deepEqual(err.validator, 'array');
  t.deepEqual(err.value, ['axe', 'troy']);
});

// test('define struct with array Literal-3', t => {
//   const s = Struct({
//     name: type.string,
//     age: type.int,
//     nickname: [[[type.string]]]
//   });
//
//   const err = s.validate({
//     name: 'axetroy',
//     age: 18,
//     nickname: [[['axe', 'troy']], [[['hello', 'world']]]]
//   });
//
//   t.deepEqual(err, void 0);
// });

test('define struct with object Literal', t => {
  const s = Struct({
    name: type.string,
    age: type.int.gte(18),
    address: {
      code: type.int,
      city: type.string
    }
  });

  const err = s.validate({
    name: 'axetroy',
    age: 18,
    address: {
      code: 10086,
      city: 'dc'
    }
  });

  t.deepEqual(err, void 0);
});

test('define struct Literal', t => {
  const s = Struct(type.string);

  const err = s.validate('123123');

  t.deepEqual(err, void 0);

  const err1 = s.validate(123);

  t.deepEqual(err1.validator, 'string');
  t.deepEqual(err1.value, 123);

  const sarray = Struct([type.string]);

  const err2 = sarray.validate(['string', 'array']);

  t.deepEqual(err2, void 0);

  const err3 = sarray.validate(['string', 'array', 123]);

  t.deepEqual(err3.validator, 'string');
  t.deepEqual(err3.keys, [2]);
  t.deepEqual(err3.value, 123);

  const err4 = sarray.validate('not array string');

  t.deepEqual(err4.validator, 'array');
  t.deepEqual(err4.keys, []);
  t.deepEqual(err4.value, 'not array string');
});
