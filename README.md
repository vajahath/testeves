# testeves

A workaround testing strategy for highly coupled legacy codebase.

## Why

Sometimes you need to test some legacy code which is not actually testable. Refactoring the codebase to write testable code may be hard or it doesn't worth.

## How

It's important to learn how testeves works. It is a simple concept.
You emit events at critical points in the codebase. The test agent will listen for these events and execute expectations.

## Install

```sh
npm install @vaju/testeves
```

This package includes type definitions required for TypeScript.

## Usage

The tests for this repo ([inside the `/tests` dir](https://github.com/vajahath/testeves/tree/master/tests)) is an ideal example.

The code you need to test: `foo.js`

```js
const { Testeves } = require('@vaju/testeves');
// or
import { Testeves } from '@vaju/testeves';

// create a hook
const hook = new Testeves();

// ... somewhere in the actual codebase we want to test ...

function foo() {
  ['a', 'b', 'c'].forEach(item => {
    // emit events
    hook.emit({ [item]: true });
  });
  // when the flow is complete, call finishProcess().
  return hook.finishProcess();
}

module.exports = { foo, hook };
```

Then the test file: `foo.spec.js`

```js
const { foo, hook } = require('./foo');

// Start the observer. Here is where
// the emitted events are stored.
const observer = hook.listen();

// Before running into actual tests, wait for
// the entire flow to complete.
beforeAll(() => {
  // invoke the function.
  foo();
  // hook.isFinished returns a promise, which is
  // resolved when the hook.finishProcess() is called
  // in the testing code.
  return hook.isFinished;
});

describe('testing', () => {
  test('testing a', () => {
    // the observer object stores the emitted
    // events and their values.
    expect(observer.a).toBe(true);
  });
  test('testing b', () => {
    expect(observer.b).toBe(true);
  });
  test('testing c', () => {
    expect(observer.c).toBe(true);
  });
});
```

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
