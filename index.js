/*!
 * assemble-redirects <https://github.com/assemble/assemble-redirects>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Generate a redirects.json file from a stream of manifest.json files.
 *
 * ```js
 * app.src(patterns)
 *   .pipe(redirects(app))
 *   .on('data', function(file) {
 *     if (file.path === 'redirects.json') {
 *       console.log(file.content);
 *     }
 *   });
 * ```
 * @param  {Object} `app` Instance of an app that's inherited from [templates][].
 * @param  {Object} `options` Additional options used to control `redirects.json` file.
 * @param  {String} `options.path` Path to be set on newly created file. (Defaults to `redirects.json`)
 * @return {Stream} Stream that can be used in a pipeline.
 * @api public
 */

module.exports = function redirects(app, options) {
  if (!app || !app.isApp) {
    throw new Error('expects `app` to be an instance of an app that inherits from templates');
  }

  var opts = utils.extend({ path: 'redirects.json' }, options);
  var manifests = {};

  return utils.through.obj(function(file, enc, cb) {

    var segs = file.dirname.split('/');
    var version = segs[segs.length - 1];
    manifests[version] = JSON.parse(file.contents);
    cb(null, file);

  }, function(cb) {

    var keys = Object.keys(manifests).map(utils.toVersions);
    var versions = utils.sort(keys, [
      utils.compare('major'),
      utils.compare('minor'),
      utils.compare('patch')
    ]).map(function(version) {
      return version.orig;
    });

    var data = versions.reduce(function(acc, version) {
      return manifests[version].reduce(function(acc, dest) {
        var fp = dest.substr(('en/' + version + '/').length);
        acc[fp] = dest;
        return acc;
      }, acc);
    }, {});

    var file = app.view({
      path: opts.path,
      content: JSON.stringify(data, null, 2)
    });

    this.push(file);
    cb();
  });
};
