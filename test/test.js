'use strict';

var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var dwebp = require('../index');

it('should convert WebP images', function (callback) {
  this.timeout(false);

  var stream = dwebp();

  stream.on('data', function (file) {
    assert(fs.statSync('test/fixtures/test.png').isFile());
    callback();
  });

  stream.write(new gutil.File({
    path: __dirname + '/fixtures/test.webp',
    contents: fs.readFileSync('test/fixtures/test.webp')
  }));
});

it('should skip unsupported images', function (callback) {
  var stream = dwebp();

  stream.on('data', function (file) {
    assert.strictEqual(file.contents, null);
    callback();
  });

  stream.write(new gutil.File({
    path: __dirname + 'fixtures/test.bmp'
  }));
});