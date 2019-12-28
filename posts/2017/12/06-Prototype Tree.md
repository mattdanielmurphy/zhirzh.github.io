Anyone who has worked with JS long enough knows something or the other about delegation, prototype chains, [dunder proto] and other similar things.
There are times when I wonder how complex and deep this chaining can be.
This past week, however, my curiosity got the best of me and I just had to find the answer for myself.

I wrote a script that scans the global namespace and generates an _inheritance_ tree (prototype tree, actually).

There are a few fundamental properties of JS (and probably Java too):

1. Every _thing_ is an object.
2. All objects delegate to some parent class.
3. All delegation chains end at the same `null`.

The function `parse` recursively traverses up a `class`'s prototype chain and populates a tree structure in `data`.

```js
function parse(data, Class) {
  if (Class === null) {
    return data.children
  }

  const parentPrototype = Object.getPrototypeOf(Class.prototype)
  const parentClass =
    parentPrototype === null ? null : parentPrototype.constructor

  const prevLevel = parse(data, parentClass)
  const node = prevLevel.find(n => n.name === Class.name)

  if (node !== undefined) {
    return node.children
  }

  const newNode = {
    name: Class.name,
    children: [],
  }

  prevLevel.push(newNode)

  return newNode.children
}
```

This works perfect in browsers because everything that is a part of the JS execution environment, BOM, DOM and CSSOM reside under the global scope `window`.
You can see the prototype tree below or in a
<a href="https://zhirzh.github.io/prototype-tree?mode=browser" target="_blank">new tab</a>
.

<Insert type="iframe" src="https://zhirzh.github.io/prototype-tree?mode=browser" title="Prototype Tree - Browser" />

There are, however, some differences in the structures present in the global scope.
Here's a list of a few examples:

- Different Browsers - The [`captureStream()`] method of `<canvas />` element returns an instance of `CanvasCaptureMediaStreamTrack` on Chrome and of `CanvasCaptureMediaStream` on Firefox.
  There are many more differences, especially in the availability of SVG elements.
- Browser Versions - As browsers progress, new features are added and older ones canned
- Different Platform - Chrome on android devices has the [Bluetooth] API, Linux does not.
- Protocol - Chrome allows access to the new [Credential] and [MediaKeys] APIs on secure websites (HTTPS protocol).
- Different Websites - It is no surprise that websites can and will pollute the global scope with things they need.
  In all fairness though, this isn't all too important.

## NodeJS

Things are a bit different for NodeJS.
The default execution environment only contains the language's minimal feature set.
All additional features are in separate modules.
Naively running the code above results in a
<a href="https://zhirzh.github.io/prototype-tree?mode=node" target="_blank">sparse tree</a>
.

<Insert type="iframe" src="https://zhirzh.github.io/prototype-tree?mode=node" title="Prototype Tree - NodeJS" />

If we want to _look_ at a module's structures, we must import the module and traverse it.
This might sound a simple thing to do, but can make the code really messy.
Instead, we will invert the module inside-out, adding all its structures to the global scope.

When polluting the global scope, we need to be wary of name clashes and overwrites.
This can be avoided by adding the module name to the structure name, i.e., scoping it.

```js
const modNames = ['assert', 'async_hooks', ...'vm', 'zlib']

modNames.forEach(modName => {
  const mod = require(modName)

  Object.getOwnPropertyNames(mod)
    .filter(propName => /[A-Z]/.test(propName[0]))
    .forEach(propName => {
      const prop = mod[propName]

      if (typeof prop.name === 'string' && prop.name.length > 0) {
        prop.scopedName = prop.name + '[' + modName + ']'
      }

      const scopedPropName = propName + '[' + modName + ']'
      global[scopedPropName] = prop
    })
})
```

After adding the code above, we get the
<a href="https://zhirzh.github.io/prototype-tree?mode=node" target="_blank">full tree</a>.

Notice how the class `Server` is present at multiple branches and levels in the tree.
Without scoping the class names, `tls` would've overwritten `http` server node.

<Insert type="iframe" src="https://zhirzh.github.io/prototype-tree?mode=node" title="Prototype Tree - Core JavaScript" />

## The End

Plotting these beautiful [D3 tree charts] revealed more things about JS than I originally sought.

I also realised just how huge BOM and DOM are.
Every entity in HTML, SVG, CSS, XML entity has its own class.
Every WebAPI comes with its structures and each one of them has its class.

You can further explore the graphs or even plot your own.
The code and example links are below:

- Code: [zhirzh/prototype-tree](https://github.com/zhirzh/prototype-tree)
- Demos:
  - [Browser](https://zhirzh.github.io/prototype-tree?mode=browser)
  - [Node](https://zhirzh.github.io/prototype-tree?mode=node)

[dunder proto]: http://2ality.com/2012/10/dunder.html
[`object` class]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
[d3 tree charts]: http://bl.ocks.org/robschmuecker/7880033
[interfaces]: https://www.javatpoint.com/interface-in-java
[abstract classes]: https://www.javatpoint.com/abstract-class-in-java
[`object.getprototypeof()`]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
[`object.setprototypeof()`]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
[on mdn]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
[`capturestream()`]: https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/captureStream
[bluetooth]: https://developer.mozilla.org/docs/Web/API/Web_Bluetooth_API
[credential]: https://developer.mozilla.org/docs/Web/API/Credential_Management_API
[mediakeys]: https://developer.mozilla.org/docs/Web/API/MediaKeys
