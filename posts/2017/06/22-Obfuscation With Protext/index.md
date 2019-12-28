Obfuscation is the process of making something obscure, unclear, or unintelligible. Basic techniques, such as markup minification and mangling, can only slow people down from understanding the code and don't improve overall security.

## HackerRank hiring challenge

Thanks to HackerRank's impromptu hiring challenge, I came across a new and unique obfuscation technique. The challenge itself was released on June 18, 2017 by [Shiv Deepak], Engineering Manager at HackerRank, and later by the official HackerRank twitter account.

<figure>
    <blockquote class="twitter-tweet"><p>Can you build a generic solution to break the HTML obfuscation on this page? - <a href="https://t.co/xcw8QlHHZg">https://t.co/xcw8QlHHZg</a> <a href="https://twitter.com/hashtag/HackerRank?src=hash&amp;ref_src=twsrc%5Etfw">#HackerRank</a> <a href="https://twitter.com/hashtag/Hiring?src=hash&amp;ref_src=twsrc%5Etfw">#Hiring</a> <a href="https://twitter.com/hashtag/Challenge?src=hash&amp;ref_src=twsrc%5Etfw">#Challenge</a></p>&mdash; Shiv Deepak (@shivdeepak_) <a href="https://twitter.com/shivdeepak_/status/876317554750308352?ref_src=twsrc%5Etfw">June 18, 2017</a></blockquote>
    <blockquote class="twitter-tweet"><p>We will be at DeveloperWeek NYC! Can solve this? - <a href="https://t.co/XjVwL23Z96">https://t.co/XjVwL23Z96</a> Get swag and more!<a href="https://twitter.com/hashtag/hackerrank?src=hash&amp;ref_src=twsrc%5Etfw">#hackerrank</a> <a href="https://twitter.com/hashtag/code?src=hash&amp;ref_src=twsrc%5Etfw">#code</a> <a href="https://twitter.com/hashtag/codefast?src=hash&amp;ref_src=twsrc%5Etfw">#codefast</a></p>&mdash; HackerRank (@hackerrank) <a href="https://twitter.com/hackerrank/status/876458261536542721?ref_src=twsrc%5Etfw">June 18, 2017</a></blockquote>
    <figcaption>Challenge tweets</figcaption>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</figure>

The challenge was based on the decoding content that was rendered on the screen. They implemented a special encoder mechanism that made this ...

<Insert type="image" src="protext off.png" />

... _render_ as this in the browser.

<Insert type="image" src="protext on.png" />

Trying to copy the text and you get a whole lot of gibberish. You can see it for yourself on the [challenge page][protext-challenge].

## Understanding the mechanism

Server was really sending just gibberish but it was _rendered_ as readable text in the browser. There must be some controller in the server-side that would map the comprehensible character set to the gibberish and send the distorted text.

On the client-side, a custom font was used that reverse-mapped the unicode values of the character set of the gibberish to the [font glyphs] of a comprehensible text, thus, undoing the transformation but only on the screen.

I was able to cook up some code that reads the font file and extracts the mapping from it. The result looked good I learned how to read font files using [FontForge] and how to manipulate them using [`opentype.js`]. There were 3 key properties to look into:

1. `unicode`: The unicode value of the character
1. `path`: The SVG path that gives shape on screen
1. `advance-width`: The proportional width of a glyph ('W' is wider then 'i')

You can find my solution code on [bitbucket] and if you want to play with it, I also made an [app][protext-decoder] for it.

<Insert type="iframe" post safe title="Protext proof-of-concept demo" src="demo/" />

## ProText as a package

HackerRank named this decoder challenge ProText (portmanteau of protect text). Under the same name, I made a node package [`protext`][npm].

Content obfuscation isn't something we need everything. But when we do need it, coming up with a novel implementation can be tough. The only major situations where I feel protext-like obfuscation would be necessary are situations where onscreen content is used for verification in some way. For example, github's repository deletion prompt:

<Insert type="image" src="git confirm.png" />

[shiv deepak]: https://www.linkedin.com/in/shivdeepak
[font glyphs]: https://wikipedia.org/wiki/Glyph
[protext-challenge]: https://protext.herokuapp.com
[fontforge]: https://fontforge.org
[npm]: https://github.com/zhirzh/protext
[bitbucket]: https://bitbucket.org/zhirzh/protext-decoder
[protext-decoder]: https://protext-decoder.herokuapp.com
[`protext`]: https://github.com/zhirzh/protext
[`opentype.js`]: http://npmjs.com/package/opentype.js
