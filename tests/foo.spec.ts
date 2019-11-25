import { hook } from './init';
const observer = hook.listen();

import { foo } from './foo';

beforeAll(() => {
  console.log('process.version', process.version);
  foo();
  return hook.isFinished;
});

describe('testing', () => {
  test('testing a', () => {
    expect(observer).not.toBeFalsy();
    expect((observer || {}).a).toBe(true);
  });
  test('testing b', () => {
    expect(observer).not.toBeFalsy();
    expect((observer || {}).b).toBe(true);
  });
  test('testing c', () => {
    expect(observer).not.toBeFalsy();
    expect((observer || {}).c).toBe(true);
  });
});
