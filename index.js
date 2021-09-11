import path from 'node:path';
import replaceExt from 'replace-ext';
import PluginError from 'plugin-error';
import through from 'through2';
import execBuffer from 'exec-buffer';
import bin from 'dwebp-bin';

const booleanFlags = new Set(['bmp', 'tiff', 'pam', 'ppm', 'pgm', 'yuv', 'nofancy', 'nofilter', 'nodither', 'mt', 'flip', 'noasm']);

const dwebp = (options = {}) => through.obj(async (file, enc, callback) => {
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
  for (const key of Object.keys(options)) {
    args.push(`-${key}`);

    if (!booleanFlags.has(key)) {
      args.push(options[key]);
    }
  }

  try {
    const buffer = await execBuffer({
      input: file.contents,
      bin,
      args,
    });

    file.contents = buffer;
    file.path = replaceExt(file.path, '.png');
    callback(null, file);
  } catch (error) {
    callback(new PluginError('gulp-dwebp', error));
  }
});

export default dwebp;
