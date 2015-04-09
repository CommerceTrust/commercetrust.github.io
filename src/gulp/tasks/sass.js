var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var please       = require('gulp-pleeease');
var plumber      = require('gulp-plumber');
//var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    //.pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(please(config.postProcess))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
