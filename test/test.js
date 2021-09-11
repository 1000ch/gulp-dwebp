import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import Vinyl from 'vinyl';
import isPng from 'is-png';
import dwebp from '../index.js';

test.cb('should convert WebP images', t => {
  const webp = fileURLToPath(new URL('fixtures/test.webp', import.meta.url));
  const png = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
  const stream = dwebp({nofancy: true});
  const buffer = fs.readFileSync(webp);

  stream.on('data', file => {
    t.true(isPng(file.contents));
    t.is(file.path, png);
  });

  stream.on('end', () => t.end());

  stream.end(new Vinyl({
    path: webp,
    contents: buffer,
  }));
});

test.cb('should skip unsupported images', t => {
  const bmp = fileURLToPath(new URL('fixtures/test.bmp', import.meta.url));
  const stream = dwebp({nofancy: true});

  stream.on('data', file => {
    t.is(file.contents, null);
  });

  stream.on('end', () => t.end());

  stream.end(new Vinyl({
    path: bmp,
    contents: null,
  }));
});
