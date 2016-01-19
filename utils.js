'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('array-sort', 'sort');
require('extend-shallow', 'extend');
require('through2', 'through');

/**
 * Restore `require`
 */

require = fn;

utils.compare = function(prop) {
  return function(a, b) {
    var aa = a[prop];
    var bb = b[prop];
    if (utils.isWordChar(aa) || utils.isWordChar(bb)) {
      return aa.localeCompare(bb);
    }
    aa = +aa;
    bb = +bb;
    if (aa > bb) return 1;
    if (aa < bb) return -1;
    return 0;
  };
};

utils.isWordChar = function(str) {
  return /[^\d]/.test(String(str));
};

utils.toVersions = function(str) {
  return utils.toVersion.apply(null, [str].concat(str.split('.')));
};

utils.toVersion = function(orig, major, minor, patch) {
  var tag = '';
  var m = /^([^-]+)-(\w+)$/.exec(patch);
  if (m) {
    patch = m[1];
    tag = m[2];
  }

  return {
    orig: orig,
    major: major.slice(1),
    minor: minor,
    patch: patch,
    tag: tag
  };
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
