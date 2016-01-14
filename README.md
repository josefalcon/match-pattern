# match-patterns
A js package for Chrome's [match patterns](https://developer.chrome.com/extensions/match_patterns).

```javascript
var matchPattern = require('match-pattern');

var pattern = matchPattern.parse('*://*.google.com/foo*bar');
if (pattern.test('https://docs.google.com/foobar')) {
  // ...
}

if (pattern.test('http://mail.google.com/foobazbar')) {
  // ...
}
```

## Installation

```sh
npm install match-pattern
```

## Documentation

### `parse()`

Use `parse()` to parse a string match pattern. Returns a `RegExp` if the parse
was successful, null otherwise.

### `allUrls()`

Returns a `RegExp` matching any URL that uses a permitted scheme.
