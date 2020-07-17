'use strict';
const path = require('path');
const replaceExt = require('replace-ext');
const PluginError = require('plugin-error');
const through = require('through2');
const execBuffer = require('exec-buffer');
const dwebp = require('dwebp-bin');

module.exports = (options = {}) => through.obj(async (file, enc, callback) => {
  if (file.isNull()) {
    callback(null, file);
    return;
  }

  if (file.isStream()) {
    callback(new PluginError('gulp-dwebp', 'Streaming not supported'));
    return;
  }

  if (!['.webp'].includes(path.extname(file.path).toLowerCase())) {
    callback(null, file);
    return;
  }

  const args = ['-o', execBuffer.output, execBuffer.input];
  Object.keys(options).forEach(key => {
    args.push('-' + key);
    args.push(options[key]);
  });

  try {
    const buffer = await execBuffer({
      input: file.contents,
      bin: dwebp,
      args
    });

    file.contents = buffer;
    file.path = replaceExt(file.path, '.png');
    callback();
  } catch (error) {
    callback(new PluginError('gulp-dwebp', error));
  }
});
