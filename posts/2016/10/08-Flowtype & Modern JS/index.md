When people think about type-safe languages, JavaScript is not a name that comes to mind. At least not in a good way. But all that is going away.

```js
// [number + string] + string === string
const num = 123
const str = 'hello world'

console.log([num + str] + num) //> 123hello world123
```

This contrived example shows the problem with JS -- its _weak_, dynamic type system. Fixing this behavior will definitely break thousands, if not millions, of websites across time. But there's a better way.

## Flow

[Flow] is a static type checker for JS by Facebook. It performs static analysis based on the structure of our code and reports any errors.

Here's a short demo of what Flow can do.

```ts
// @flow

let foo: string = 123
```

Flow knows that `foo` is supposed to be a string and assigning it a number is definitely wrong.

```
3: let foo: string = 123
                     ^ number. This type is incompatible with
3: let foo: string = 123
            ^ string
```

In some cases, Flow can smartly™ infer the correct types of something just by it's usage in the code.

> Using data flow analysis, Flow infers types and tracks data as it moves through your code. You don't need to fully annotate your code before Flow can start to find bugs.

This means that when Flow comes across a function `times10()`:

```js
// @flow

function times10(x) {
  return x * 10
}

times10('Hello, world!')
```

... it can infer the type of the parameter `x` given in definition, the type of the argument passed in, compare them and report the following:

```
4:     return x * 10
              ^ string. The operand of an arithmetic operation must be a number.
```

You can read more about flow, and its syntax in the [docs].

## Modern JS

Over the years, JS has become the "language of the web" and as such is fairly difficult to fix, improve or extend with new features. For that purpose, a the TC39 committee has decided on a yearly release cycle which updates the language spec and gives enough time for implementors to catch up.

Along with the changing nature of the language, there has been a visible shift in how web-development. The standard practice of updating the DOM is being replaced by a newer, perhaps _better_ approach of generating the DOM. A few key players in all this are [babel], [webpack], [react].

We already have multiple recipes for integrating these different yet related pieces of tech. To add Flow to the mix, I made a webpack plugin that simplifies the process of integrating a static type checker -- [`flow-babel-webpack-plugin`][fbwp]. As you can judge by the name, it is meant to glue flow, babel and webpack together.

## Usage

### 1. Install FBWP

```sh
npm i -D flow-babel-webpack-plugin
OR
yarn add -D flow-babel-webpack-plugin
```

### 2. Setup babel & webpack for Flow

```json
// .babelrc

{
  // ...
  "plugins": [
    // ...
    "transform-flow-comments"
  ]
}
```

```js
// webpack.config.js

var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // ...
    new FlowBabelWebpackPlugin(),
  ],
}
```

## 3. Create .flowconfig

```sh
npx flow init
```

And that's it!

Now we can start adding flow annotations to our code and the next time we start webpack, BOOM! - type errors in the pretty red colour we all love/hate.

<Insert type="image" src="demo.png" alt="FBWP in action" />

## The End

Static type checking is a useful feature that makes it easier to catch potential bugs and, personally speaking, makes development feel simpler. I hope you find the same utility in [`flow-babel-webpack-plugin`][fbwp]. If you see any bugs, report them [here][issues].

[flow]: https://flow.org
[docs]: https://flow.org/docs
[webpack]: https://webpack.js.org
[babel]: https://babeljs.io
[react]: http://facebook.github.io/react
[fbwp]: https://github.com/zhirzh/flow-babel-webpack-plugin
[issues]: https://github.com/zhirzh/flow-babel-webpack-plugin/issues
