var gulp        = require('gulp');
var config     = require('../config').deploy;
var deploy      = require('gulp-gh-pages');

// Push build to gh-pages

gulp.task('deploy', function () {
  return gulp.src(config.buildSrc)
    .pipe(deploy())
});
