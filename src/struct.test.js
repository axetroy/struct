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
    info: type.object({
      age: type.int
    })
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
    info: type.object({
      age: type.int,
      location: type.object({
        x: type.int,
        y: type.int
      })
    })
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

test('skip the field which did not define', t => {
  t.notThrows(function() {
    const s = Struct({
      name: type.string
    });

    s.validate({
      name: 'axetroy',
      age: 18 // did not define the field
    });
  });
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
  const msg = `Argument of Struct must be an object!`;
  // invalid struct argument
  t.throws(function() {
    Struct(null);
  }, msg);

  t.throws(function() {
    Struct([]);
  }, msg);

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
