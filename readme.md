# gulp-dwebp ![GitHub Actions Status](https://github.com/1000ch/gulp-dwebp/workflows/test/badge.svg?branch=main)

Convert WebP images to PNG with gulp task.

## Install

```sh
$ npm install --save-dev gulp-dwebp
```

## Usage

This is `gulpfile.js` sample.

```js
const gulp = require('gulp');
const dwebp = require('gulp-dwebp');

gulp.task('dwebp', function () {
  gulp.src('./fixtures/*')
    .pipe(dwebp())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['dwebp']);
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
