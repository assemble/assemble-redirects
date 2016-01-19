/*!
 * assemble-redirects <https://github.com/assemble/assemble-redirects>
 *
 * Copyright (c) 2016 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var assemble = require('assemble-core');
var redirects = require('../');
var app;

describe('assemble-redirects', function () {
  var expected = JSON.stringify({
    'index.html': 'en/v0.1.0/index.html',
    'about.html': 'en/v0.1.1/about.html',
    'blog/index.html': 'en/v0.2.0/blog/index.html',
    'home.html': 'en/v0.1.1/home.html',
    'home/index.html': 'en/v1.0.0/home/index.html',
    'about/index.html': 'en/v1.0.0/about/index.html'
  }, null, 2);

  beforeEach(function() {
    app = assemble();
  });

  it('should generate a redirects.json file', function (done) {
    var created = false;
    app.src([__dirname + '/fixtures/en/*/manifest.json'])
      .pipe(redirects(app))
      .on('data', function(file) {
        if (file.path === 'redirects.json') {
          created = true;
          assert.equal(file.content, expected);
        }
      })
      .on('error', done)
      .on('end', function() {
        assert(created);
        done();
      });
  });

  it('should generate a data/foo.json file', function (done) {
    var created = false;
    app.src([__dirname + '/fixtures/en/*/manifest.json'])
      .pipe(redirects(app, {path: 'data/foo.json'}))
      .on('data', function(file) {
        if (file.path === 'data/foo.json') {
          created = true;
          assert.equal(file.content, expected);
        }
      })
      .on('error', done)
      .on('end', function() {
        assert(created);
        done();
      });
  });
});
