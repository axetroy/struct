function func(validatorFunc) {
  const name = 'func()';
  validatorFunc.__name__ = name;
  this.task.push(validatorFunc);
  this.raw.push(name);
  return function(input) {
    return true;
  };
}

module.exports = func;
