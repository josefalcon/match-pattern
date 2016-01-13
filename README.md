# match-patterns
A js package for Chrome's [match patterns](https://developer.chrome.com/extensions/match_patterns).

```javascript
var matchPattern = require('match-pattern');

var pattern = matchPattern.parse('https://*.google.com/foo*bar');
if (pattern.test('https://docs.google.com/foobar')) {
  // ...
}

pattern = matchPattern.newPattern()
  .https()
  .host('*.google.com')
  .path('foo*bar');
if (pattern.test('https://www.google.com/foo/baz/bar')) {
  // ...
}
```

## Installation

```sh
npm install match-pattern
```
## `parse()`

Use `parse()` to parse a string match pattern. Returns a `RegExp` if the parse
was successful, null otherwise.

## `allUrls()`

Returns a `RegExp` matching any URL that uses a permitted scheme.

## `newPattern()`

Match patterns are safely built with `newPattern()`, followed by a scheme, a
host, and a path. While more verbose, it guarantees a valid pattern.
Valid schemes are `http`, `https`, `file`, and `ftp`. `file` patterns do not
have a host.

```js
// http://*/*
var pattern = matchPattern.newPattern()
  .http()
  .host()
  .path();

// file:///foo*
pattern = matchPatterns.newPattern().file().path('foo*')

// *://play.spotify.com/*
pattern = matchPatterns.newPattern().scheme().host('play.spotify.com').path()
```
