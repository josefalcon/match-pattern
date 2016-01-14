// Reference: https://developer.chrome.com/extensions/match_patterns
var scheme = "(\\*|http|https|file|ftp)";
var host = "(\\*|(?:\\*\\.)?(?:[^/*]+))?";
var path = "(.*)";
var regex = new RegExp(
  "^"
  + scheme
  + "://"
  + host
  + "/"
  + path
  + "$"
);

function parse(pattern) {
  var match = regex.exec(pattern);
  if (!match) return null;

  var scheme = match[1];
  var host = match[2];
  var path = match[3];

  if (!host && scheme !== 'file') return null;

  return makeRegExp(scheme, host, path);
}

function makeRegExp(scheme, host, path) {
  var regex = '^';
  if (scheme === '*') {
    regex += '(http|https)';
  } else {
    regex += scheme;
  }

  regex += "://";

  if (host) {
    if (host === '*') {
      regex += '[^/]+?';
    } else {
      if (host.match(/^\*\./)) {
        regex += '[^/]*?';
        host = host.substring(2);
      }
      regex += host.replace(/\./g, '\\.');
    }
  }

  if (path) {
    if (path === '*') {
      regex += '(/.*)?'
    } else if (path[0] !== '/') {
      regex += '/';
      regex += path.replace(/\*/g, '.*?');
      regex += '/?';
    }
  }

  regex += '$';
  return new RegExp(regex);
}

function allUrls() {
  return /(http|https|file|ftp):\/\/.+/;
}

module.exports = {
  parse: parse,
  allUrls: allUrls,
}
