var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').yaml;
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var yaml         = require('gulp-yaml');

gulp.task('yaml', function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(yaml({ space: 2 }))
    .pipe(rename("index.jade.json"))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
