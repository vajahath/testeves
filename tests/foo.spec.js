const { hook } = require('./init');
const observer = hook.listen();

const { foo } = require('./foo');

beforeAll(() => {
  foo();
  return hook.isFinished;
});

describe('testing', () => {
  test('testing a', () => {
    expect(observer.a).toBe(true);
  });
  test('testing b', () => {
    expect(observer.b).toBe(true);
  });
  test('testing c', () => {
    expect(observer.c).toBe(true);
  });
});
