// Notes:
//    - gulp/tasks/browserify.js handles js recompiling with watchify
//    - gulp/tasks/browserSync.js watches and reloads compiled files

var gulp     = require('gulp');
var config   = require('../config');
var watchify = require('./browserify')

// Not using watchify at the moment
//gulp.task('watch', ['watchify','browserSync'], function(callback) {
//
gulp.task('watch', ['browserSync'], function(callback) {
  gulp.watch(config.yaml.src, ['sequence']);
  gulp.watch(config.sass.src, ['sass']);
  //gulp.watch(config.stylus.src, ['stylus']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.inc.src, ['markup']);
  gulp.watch(config.layout.src, ['markup']);
  //gulp.watch(config.markup.src, config.inc.src, config.layout.src, ['markup']);
  //gulp.watch(config.data.src, ['markup']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
