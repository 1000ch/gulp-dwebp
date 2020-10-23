'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const Vinyl = require('vinyl');
const isPng = require('is-png');
const dwebp = require('..');

test.cb('should convert WebP images', t => {
  const webp = path.join(__dirname, 'fixtures/test.webp');
  const png = path.join(__dirname, 'fixtures/test.png');
  const stream = dwebp({nofancy: true});
  const buffer = fs.readFileSync(webp);

  stream.on('data', file => {
    t.true(isPng(file.contents));
    t.is(file.path, png);
  });

  stream.on('end', () => t.end());

  stream.end(new Vinyl({
    path: webp,
    contents: buffer
  }));
});

test.cb('should skip unsupported images', t => {
  const bmp = path.join(__dirname, 'fixtures/test.bmp');
  const stream = dwebp({nofancy: true});

  stream.on('data', file => {
    t.is(file.contents, null);
  });

  stream.on('end', () => t.end());

  stream.end(new Vinyl({
    path: bmp,
    contents: null
  }));
});
