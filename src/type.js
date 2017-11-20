/**
 * create a type
 * @returns {Type}
 * @constructor
 */
function Type() {
  if (this instanceof Type === false) {
    return new Type();
  }
  this.task = [];
  this.raw = [];
}

Type.prototype.constructor = Type;
Type.prototype.__exec__ = function(val) {
  // run checker
  const tasks = [].concat(this.task);
  while (tasks.length) {
    const task = tasks.shift();
    const isSuccess = task.call(this, val);
    if (isSuccess === false) {
      throw new Error(`Can not pass the validator ${task.__name__}`);
    }
  }
};

module.exports = Type;
