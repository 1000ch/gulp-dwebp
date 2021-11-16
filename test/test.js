import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import Vinyl from 'vinyl';
import isPng from 'is-png';
import {pEvent} from 'p-event';
import dwebp from '../index.js';

test('should convert WebP images', async t => {
  const webp = fileURLToPath(new URL('fixtures/test.webp', import.meta.url));
  const png = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
  const stream = dwebp({nofancy: true});
  const buffer = fs.readFileSync(webp);

  stream.on('data', file => {
    t.true(isPng(file.contents));
    t.is(file.path, png);
  });

  stream.end(new Vinyl({
    path: webp,
    contents: buffer,
  }));

  await pEvent(stream, 'end');
});

test('should skip unsupported images', async t => {
  const bmp = fileURLToPath(new URL('fixtures/test.bmp', import.meta.url));
  const stream = dwebp({nofancy: true});

  stream.on('data', file => {
    t.is(file.contents, null);
  });

  stream.end(new Vinyl({
    path: bmp,
    contents: null,
  }));

  await pEvent(stream, 'end');
});
