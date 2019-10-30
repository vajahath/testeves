const { hook } = require('./init');

function foo() {
  ['a', 'b', 'c'].forEach(item => {
    hook.emit({ [item]: true });
  });
  return hook.finishProcess();
}

module.exports = { foo };
