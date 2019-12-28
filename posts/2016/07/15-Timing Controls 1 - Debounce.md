In analog electrical systems, pressing a spring based mechanical switch is results in several tightly packed signals as the spring bounces for a short while. Various mechanism and techniques are used to "de bounce" to filter out these unwanted signal spikes.

## JS debounce function

The basic idea behind debounce is to discard all but one events that occur within a fixed time duration.

```js
// Debounced function
const delay = 1000

function foo() {
  console.log('foo')
}

let timeoutID = null

function debouncedFoo() {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    foo()
  }, delay)
}

window.addEventListener('mousemove', debouncedFoo)
```

When `debouncedFoo()` is called, it sets a timer for `delay` milliseconds and waits. If it is called another time within that waiting period then it will reset the timer and start all over again. When the timer finally runs out, call the original `foo()` function.

This works fine in principle but there are few problems with this implementation.

### Problem #1: Passing arguments

What if `foo()` accepts some arguments? We need to provide those arguments on call. This problem can be resolved by adding parameters to `debouncedFoo`.

```js
function foo(a, b, c) {
  // ...
}

function debouncedFoo(x, y, z) {
  // ...
  foo(x, y, z)
  // ...
}
```

### Problem #2: Functions with variable arity

Arity is the number of required parameters of a function. If we know how many arguments `foo()` requires, the above works just fine. In case of variable arity function, we can use the [`arguments`] object.

We can use [`Function#apply()`] method because it allows function execution with the arguments being passed as an array or array-like object (ex: `arguments`).

```js
function foo(a, b, c) {
  // ...
}

function debouncedFoo() {
  // ...
  foo.apply(this, arguments)
  // ...
}
```

## Capturing the idea

We can create a [Higher Order Function][hof] that abstracts away the process of creating a debounced function. We will call this new function `debounce()`:

By creating our `debounce()` HOF, we can now create multiple debounced functions with ease since each one is only responsible for its own timekeeping.

```js
// Simple debounce HOF
function foo() {
  console.log('foo')
}

function debounce(fn, delay) {
  let timeoutID = null

  return function() {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

window.addEventListener('mousemove', debounce(foo, 1000))
```

## Demo

<Insert type="iframe" title="Timing Controls: Debounce" src="https://codepen.io/zhirzh/embed/MEEXWL?default-tab=js,result" />

## Debouncing in reverse

Since we are discarding all but one event within a time window, why not processs the first event and discard the rest? This is called reverse debounce, leading deobunce, Immediate etc.

### Immediate

```js
// Immediate debounce
function immediate(fn, delay) {
  let timeoutID = null
  let isWaiting = false

  return function() {
    if (!isWaiting) {
      isWaiting = true

      fn.apply(this, arguments)
    }

    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      isWaiting = false
    }, delay)
  }
}

window.addEventListener('mousemove', immediate(foo, 1000))
```

## The end

We can write a single function that can handle either mode.

```js
// Debounce with immediate flag
function debounce(fn, delay, immediate = false) {
  let timeoutID = null
  let isWaiting = false

  return function() {
    if (!isWaiting && immediate) {
      isWaiting = true

      fn.apply(this, arguments)
    }

    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      if (immediate) {
        isWaiting = false
      } else {
        fn.apply(this, arguments)
      }
    }, delay)
  }
}
```

<Insert type="iframe" title="Timing Controls: Debounce+Immediate" src="https://codepen.io/zhirzh/embed/vYYQWwM?default-tab=js,result" />

[`function#apply()`]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
[hof]: https://en.wikipedia.org/wiki/Higher-order_function
[`arguments`]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/arguments
