var gulp = require('gulp');
var dwebp = require('../');

gulp.task('dwebp', function () {
  gulp.src('./fixtures/*')
    .pipe(dwebp())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['dwebp']);