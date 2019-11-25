import { hook } from './init';

export function foo() {
  ['a', 'b', 'c'].forEach(item => {
    hook.emit({ [item]: true });
  });
  return hook.finishProcess();
}
