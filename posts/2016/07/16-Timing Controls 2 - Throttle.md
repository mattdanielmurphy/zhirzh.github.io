Throttling is the technique of limiting events within a time duration. This is in contrast to how debounce operates. While a debounced function is called just once (either on the first or final event), a throttled function is called several times but after a certain delay. Think of it as a _cooldown_ period after every event.

When we see the first event, call `fn()` and enter the cooldown period. Any events that occur within this time duration are lost. When timer runs out, start listening for events again.

```js
// Throttle events
function foo() {
  console.log('foo')
}

function throttle(fn, delay) {
  let isWaiting = false

  return function() {
    if (!isWaiting) {
      fn.apply(this, arguments)
      isWaiting = true

      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }
}

window.addEventListener('mousemove', throttle(foo, 1000))
```

## Demo

<Insert type="iframe" title="Timing Controls - Throttle" src="https://codepen.io/zhirzh/embed/VwwVyrZ?default-tab=js,result" />

## Problems

After running the demo a few time, you may have noticed 2 things about the current implementation:

1. First event is **always** handled
1. final event is **never** handled

Maybe we don't want that first event or maybe we really need that final event. Let's modify the code to address these cases.

### Skip First

To check whether we should ignore the first event or not we add new parameter `skipFirst` and to track whether the first event has fired or not we add the `isFirst` flag.

When first event is fired and `skipFirst` is `true` then don't call `fn()`. Also, set a timer for `delay` ms to set `isFirst` to `false`.

```js
// Throttle without the first event
function throttle(fn, delay, skipFirst) {
  let isWaiting = false
  let isFirst = true

  return function() {
    if (isFirst) {
      setTimeout(() => {
        isFirst = false
      }, delay)
    }

    if (!isWaiting && !(isFirst && skipFirst)) {
      fn.apply(this, arguments)
      isWaiting = true

      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }
}
```

### Keep final

Keeping track of the final event is a bit tricky. First of all, it is not possible to infer if an event is a "fresh" event or some previous event. And since we need to do the same actions in both cases, we extract out the common flow as the `work()` function.

We create the `final` variable to preserve the data for the final event. We can also use it to track when the final event is supposed to fire.

The idea here is to listen for events that are fired during the cooldown phase. Instead of discarding them, we set a timer for `delay` ms to handle that event unless some other event is fired after the cooldown ends and before the timer runs out.

```js
// Throttle with final event capture
function throttle(fn, delay, keepFinal) {
  let isWaiting = false
  let finalTimer

  function work() {
    if (isWaiting && keepFinal) {
      clearTimeout(finalTimer)
      finalTimer = setTimeout(() => {
        work.apply(this, arguments)
      }, delay)
    }

    if (!isWaiting) {
      fn.apply(this, arguments)
      isWaiting = true

      clearTimeout(finalTimer)

      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }

  return work
}
```

## The End

Putting it all together.

```js
// Throttle with extra features
function throttle(
  fn,
  delay,
  { keepFinal = false, skipFirst = false } = {}
) {
  let isWaiting = false
  let isFirst = true
  let finalTimer

  function work() {
    if (isFirst) {
      setTimeout(() => {
        isFirst = false
      }, delay)
    }

    if (isWaiting && keepFinal) {
      clearTimeout(finalTimer)
      finalTimer = setTimeout(() => {
        work.apply(this, arguments)
      }, delay)
    }

    if (!isWaiting && !(isFirst && skipFirst)) {
      fn.apply(this, arguments)
      isWaiting = true

      clearTimeout(finalTimer)

      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }

  return work
}
```

<Insert type="iframe" title="Timing Controls - Throttle" src="https://codepen.io/zhirzh/embed/mddQzyR?default-tab=js,result" />

[`immediate()`]: /20161011-timing-controls-1-debounce#immediate
