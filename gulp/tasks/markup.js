var gulp = require('gulp');
var jade = require('gulp-jade');
var data = require('gulp-data');
var path = require('path');
var fs = require('fs');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var config = require('../config').markup;
var evilIcons = require('gulp-evil-icons');
var browserSync  = require('browser-sync');
var frontMatter = require('gulp-front-matter');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(data(function(file) {
      // Use this one when not watching and related to current page
      //return require('./src/data/' + path.basename(file.path) + '.json');

      //Use this one when watchgin JSON files related to the current page
      //return JSON.parse(fs.readFileSync('./src/data/' + path.basename(file.path) + '.json'));

      //Use this when watching a global JSON file for all pages
      return JSON.parse(fs.readFileSync('./src/data/index.jade.json'));
    }))
    .pipe(jade({ pretty: true }))
    .pipe(evilIcons())
    //.pipe(rename('index.html'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
