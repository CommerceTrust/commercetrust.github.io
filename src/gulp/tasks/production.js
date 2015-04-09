var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('prod', ['markup', 'images', 'minifyCss', 'uglifyJs']);
