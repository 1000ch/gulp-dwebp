# [gulp-dwebp](https://www.npmjs.org/package/gulp-dwebp)

## About

Convert your WebP images to PNG.

[![Build Status](https://travis-ci.org/1000ch/gulp-dwebp.svg?branch=master)](https://travis-ci.org/1000ch/gulp-dwebp)
[![NPM version](https://badge.fury.io/js/gulp-dwebp.svg)](http://badge.fury.io/js/gulp-dwebp)
[![Dependency Status](https://david-dm.org/1000ch/gulp-dwebp.svg)](https://david-dm.org/1000ch/gulp-dwebp)
[![devDependency Status](https://david-dm.org/1000ch/gulp-dwebp/dev-status.svg)](https://david-dm.org/1000ch/gulp-dwebp#info=devDependencies)

## Install

```sh
$ npm install --save-dev gulp-dwebp
```

## Usage

This is `gulpfile.js` sample.

```js
var gulp = require('gulp');
var dwebp = require('../');

gulp.task('dwebp', function () {
  gulp.src('./fixtures/*')
    .pipe(dwebp())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['dwebp']);
```

## License

MIT