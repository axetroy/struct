const test = require('ava');
const object = require('./object');
const Struct = require('../struct');
const Type = require('../type');

test('.object()-1', t => {
  t.notThrows(function() {
    object({
      name: Struct.type.string
    })({
      name: '123'
    });
  });

  t.throws(function() {
    object({
      name: Struct.type.string
    })({
      name: 123 // invalid type, it should throw an error
    });
  }, new Type.Error('string').message);
});

test('.object()-2', t => {
  t.throws(function() {
    object({
      name: Struct.type.string,
      age: Struct.type.int
    })({
      name: '123',
      age: '123' // invalid type, it should throw an error
    });
  }, new Type.Error('int').message);

  t.notThrows(function() {
    object({
      name: Struct.type.string,
      age: Struct.type.int,
      city: Struct.type.object({
        code: Struct.type.int,
        name: Struct.type.string
      })
    })({
      name: '123',
      age: 123,
      city: {
        code: 1,
        name: 'dc'
      }
    });
  });
});

test('.object()-3', t => {
  t.notThrows(function() {
    object({
      name: Struct.type.string,
      age: Struct.type.int,
      city: Struct.type.object({
        code: Struct.type.int,
        name: Struct.type.string,
        location: Struct.type.object({
          x: Struct.type.float,
          y: Struct.type.float
        })
      })
    })({
      name: '123',
      age: 123,
      city: {
        code: 1,
        name: 'dc',
        location: {
          x: 12.23,
          y: 34.32
        }
      }
    });
  });
});

test('.object() ignore the field which not define', t => {
  t.notThrows(function() {
    object({
      name: Struct.type.string,
      age: Struct.type.int
    })({
      name: '123',
      age: 123,
      code: 123123 // missing type, it should be skip
    });
  });
});

test('.object() return false if pass a not object', t => {
  t.false(
    object({
      name: Struct.type.string,
      age: Struct.type.int
    })(null)
  );
});

test('.object() pass a custom object', t => {
  function NewObject() {
    this.a = 123;
  }

  NewObject.prototype.b = 123;

  t.true(
    object({
      a: Struct.type.int
    })(new NewObject())
  );

  t.true(
    object({
      a: Struct.type.int
    })(new NewObject())
  );

});
