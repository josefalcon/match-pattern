var test = require('tape');
var matchPatterns = require('../index');

test('fails on missing path', function(t) {
  t.plan(1);

  var pattern = matchPatterns.parse('http://www.google.com');
  t.notOk(pattern);
});

test('fails on missing "." in host', function(t) {
  t.plan(1);

  var pattern = matchPatterns.parse('http://*foo/bar');
  t.notOk(pattern);
});

test('fails on misplace "*" in host', function(t) {
  t.plan(1);

  var pattern = matchPatterns.parse('http://foo.*.bar/baz');
  t.notOk(pattern);
});

test('fails on missing scheme separator', function(t) {
  t.plan(1);

  var pattern = matchPatterns.parse('http:/bar');
  t.notOk(pattern);
});

test('fails on invalid scheme', function(t) {
  t.plan(1);

  var pattern = matchPatterns.parse('foo://*');
  t.notOk(pattern);
});

matchTest('http://*/*', [
  'http://www.google.com/',
  'http://example.org/foo/bar.html'
]);

matchTest('http://*/foo*', [
  'http://example.com/foo/bar.html',
  'http://www.google.com/foo'
]);

matchTest('https://*.google.com/foo*bar', [
  'https://www.google.com/foo/baz/bar',
  'https://docs.google.com/foobar'
]);

matchTest('http://example.org/foo/bar.html', [
  'http://example.org/foo/bar.html'
]);

matchTest('file:///foo*', [
  'file:///foo/bar.html',
  'file:///foo'
]);

matchTest('http://127.0.0.1/*', [
  'http://127.0.0.1/',
  'http://127.0.0.1/foo/bar.html'
]);

matchTest('*://mail.google.com/*', [
  'https://mail.google.com/foobar',
  'http://mail.google.com/foo/baz/bar'
]);

test('allUrls matches any scheme', function(t) {
  t.plan(4);

  var pattern = matchPatterns.allUrls();
  t.ok(pattern.test('http://example.org/foo/bar.html'), 'matches http');
  t.ok(pattern.test('https://any.url/foo/bar.jpg'), 'matches https');
  t.ok(pattern.test('file:///bar/baz.html'), 'matches file');
  t.ok(pattern.test('ftp://user:password@host:port/path'), 'matches ftp');
});

test('any scheme only matches http and https', function(t) {
  t.plan(4)

  var pattern = matchPatterns.parse("*://*/*")
  t.ok(pattern.test('http://example.org'), 'matches http');
  t.ok(pattern.test('https://foobar.baz'), 'matches https');
  t.notOk(pattern.test('file:///file.jpg'), 'does not match file');
  t.notOk(pattern.test('ftp://user:password@host:port/path'), 'does not match ftp');
})

function matchTest(matchPattern, examples) {
  test('parses ' + matchPattern, function(t) {
    t.plan(examples.length + 1);

    var pattern = matchPatterns.parse(matchPattern);
    t.ok(pattern, 'parsed pattern');

    examples.forEach(function(e) {
      t.ok(pattern.test(e), 'matches ' + e);
    });
  });
}
