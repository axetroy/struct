const { Struct, type } = require('../index');

const data = {
  title: 'article title',
  content: 'article content',
  author: {
    name: 'Axetroy',
    age: '18'
  }
};

const User = Struct({
  name: type.string,
  age: type.int
});

const Article = Struct({
  title: type.string,
  content: type.string,
  author: User
});

const err = Article.validate(data);

console.log(err);
console.log(err.path); // [ 'author', 'age' ]
console.log(err.validator); // 'int'
console.log(err.value); // '18'
