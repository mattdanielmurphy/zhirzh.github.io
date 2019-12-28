MDN states that [`Function#name` is a read-only property][name] and this gives the false impression that a function cannot be renamed. But that is not the case.

At the time of writing, JavaScript supports 3 kinds of functions:

- Simple function
- [Async Function][async]
- [Generator Function][generator] (can be async too)

A function can be defined in 3 ways:

- **[Function Declaration][declaration]**
- [Function Expression][expression]
- [Arrow Function expression][arrow]

A function defined as a function declaration or a _named_ expression will have its `.name` attribute set to the name used in the definition.

```js
function foo() {}
console.log(foo.name) //> foo

const a = foo
console.log(a.name) //> foo

const b = function baz() {}
console.log(b.name) //> baz

const c = function() {}
console.log(c.name) //> c
```

Here's the property descriptor for the `foo()` function:

```js
{
    value: 'foo',
    configurable: true,
    enumerable: false,
    writable: false,
}
```

Since `writable` is set to `false` we can't change the `value` by simple assignment.

```js
console.log(foo.name) //> foo

foo.name = 'not foo'
console.log(foo.name) //> foo
```

However, `configurable` is set to `true` and this means that we can override this descriptor with a new one. We can also delete `.name` if we want to.

```js
console.log(foo.name) //> foo

Object.defineProperty(foo, 'name', { value: 'not foo' })
console.log(foo.name) //> not foo

delete foo.name
console.log(foo.name) //> undefined
```

## Display name

There is a non-standard property [`Function#displayName`][displayname] that only Firefox supports and is used to display the function with an _alter ego_ in the console.

```js
// Firefox

function foo() {}
foo.displayName = 'notFoo'
foo // "function notFoo()"
```

[name]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/name
[declaration]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
[expression]: https://developer.mozilla.org/docs/web/JavaScript/Reference/Operators/function
[arrow]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[generator]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*
[async]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function
[displayname]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
