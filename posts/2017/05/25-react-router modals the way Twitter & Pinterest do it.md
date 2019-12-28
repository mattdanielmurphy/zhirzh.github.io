Twitter and Pinterest are two websites that use modals heavily. I'd go as far as to say that they use modals as a central components of their design, and not just some auxiliary tools.

> **Update**
> Since the time of posting this article, both Twitter and Pinterest have ditched the "show modal or load container" approach and now load fully-featured screens for each interaction. I have copied the original behavior in a separate [repo]. You can try it out [here][demo].

## Twitter

When a user opens an tweet, URL changes to the tweet's URL (indicating a navigation) and a modal pops up showing the tweet. Close the modal and you go back to the screen below. Pretty standard stuff.

What's different is that if a user opens the tweet in a new tab (vir URL) or reloads the page white the modal is open, a new _container element_ is loaded first and then the tweet loads in the modal. The container is a simple screen resembling the profile of the user who posted the tweet.

Now when the modal is closed, the URL changes to the profile page of the user who posted the tweet and the container is populated with past tweets.

The main content can be accessed with `$('.PermalinkOverlay')`.

```js
const App = () => (
  <Switch location={isModal ? this.previousLocation : location}>
    ...
    <Route
      path="/twitter"
      render={() => (
        <>
          {isModal ? null : <Container />}

          <Modal />
        </>
      )}
    />
  </Switch>
)
```

### Pinterest

Everything is the same as Twitter until the _container element_ comes into play. However, unlike Twitter, the container that Pinterest loads has extra features related to the content: like, share, bookmark, etc.

In fact, Pinterest seems to use the same container in the modal as well. You can inspect the common components on either page by accessing it from the console using `$('.Closeup.Module.flex')`.

```js
const App = () => (
  <Switch location={isModal ? this.previousLocation : location}>
    ...
    <Route
      path="/pinterest"
      render={() => {
        const Component = isModal ? Modal : Container

        return <Component />
      }}
    />
  </Switch>
)
```

## The difference

The difference is in the purpose of the said _container element_.

Twitter uses a super-simple container that acts as a placeholder for future content whereas Pinterest loads a component that loads the image, any related metadata and relevant actions.

[repo]: https://github.com/zhirzh/react-router-twitter-pinterest-style
[demo]: https://zhirzh.github.io/react-router-twitter-pinterest-style
