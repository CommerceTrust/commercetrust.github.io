var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('sequence', function(callback) {
  runSequence('yaml', 'markup', callback);
});
