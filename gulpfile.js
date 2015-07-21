// TODO
// Task to Remove Sourcemaps and comments - no minification


// Paths
var sendto = {
  dist: './dist'
};

var srcPath = {
  jade: './src/htdocs/**/*.jade',
  inc: './src/inc/**/*.jade',
  layout: './src/layout/**/*.jade',
  yaml: './src/data/data.yaml',
  img: './src/images/**/*',
  sass: './src/sass/**/*.{sass,scss}',
  js: './src/javascript/**/*.js',
  pdf: './src/pdf/**/*.pdf',
  robots: './src/robots.txt',
  svg: './src/svg/**/*.svg',
  favicon: './src/favicon.ico'
};


// Modules
var gulp            = require('gulp');
var browserSync     = require('browser-sync');      // Automagicly refreshes browser when you save
var reload          = browserSync.reload;
var sass            = require('gulp-sass');         // PreProcessor
// var rupture         = require('rupture');        // Use Rupture for
var sourcemaps      = require('gulp-sourcemaps');   // SourceMaps for CSS and JS
var please          = require('gulp-pleeease');     // PostProcessor for (auto-prefixing, minifying, and IE fallbacks)
var evilIcons       = require('gulp-evil-icons');   // SVG Icon Library
var jade            = require('gulp-jade');         // Jade for HTML
var marked          = require('marked');            // Enable MarkDown with Jade. :markdown filter
var plumber         = require('gulp-plumber');      // Prevent pipe from breaking even if and error is encountered
var data            = require('gulp-data');         // Used to Create a static DB
var path            = require('path');
var fs              = require('fs');
var frontMatter     = require('gulp-front-matter'); // Used to enable frontMatter
var rename          = require('gulp-rename');       // Used to rename files
var yaml            = require('gulp-yaml');         // Used to convert YAML into JSON for static DB
var runSequence     = require('run-sequence');      // Used to run tasks in a sequence
var changed         = require('gulp-changed');      // Used to check if a file has changed
var imagemin        = require('gulp-imagemin');     // Used to compress images
var pngquant        = require('imagemin-pngquant'); // Used to compress pngs
var notify          = require('gulp-notify');       // Used to output messages during gulp tasks

var ghPages         = require('gulp-gh-pages');     // Used to move Dist to gh-pages

// Production tasks for later
// var argv            = require('yargs').argv;        // Used to notice flags in your gulp commands
// var gulpif          = require('gulp-if');           // Used to create conditionals in your gulp tasks
// var production      = !!(argv.prod);                // true if --prod flag is used

//var uglify = require('gulp-uglify');
// TODO - add JS minification, linting, and concatenation
//var uglify

// Pleeease Post-Prosessor options
var pleaseOptions  = {
  autoprefixer: {
    browsers: ['ie >= 8', 'ie_mob >= 10', 'ff >= 3.6', 'chrome >= 10', 'safari >= 5.1', 'opera >= 11', 'ios >= 7', 'android >= 4.1', 'bb >= 10']
  },
  filters: true,
  rem: true,
  pseudoElements: true,
  opacity: true,

  import: false,
  minifier: false, //CSS Wring is being used here
  mqpacker: true,

  sourcemaps: false,

  next: {
    calc: false,
    customProperties: false,
    customMedia: false,
    colors: false
  }
};


gulp.task('sass', function () {
  return gulp.src('./src/sass/style.sass')
    //.pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true,
        indentedSyntax: true
        //includePaths : './src/sass/style.sass'
      }))
    //.pipe(sourcemaps.write())
    .pipe(please(pleaseOptions))
    .pipe(gulp.dest(sendto.dist + '/css'))
    .pipe(reload({ stream: true }));
});


// gulp.task('sass-gh', function () {
//   return gulp.src('./src/sass/style.sass')
//     .pipe(sass({
//         errLogToConsole: true,
//         indentedSyntax: true
//         //includePaths : './src/sass/style.sass'
//       }))
//     .pipe(please(pleaseOptions))
//     .pipe(gulp.dest(sendto.dist + '/css'))
//     .pipe(reload({ stream: true }));
// });


gulp.task('yaml', function () {
  return gulp.src(srcPath.yaml)
    //.pipe(plumber())
    .pipe(yaml({ space: 2 }))
    .pipe(rename('index.jade.json'))
    .pipe(gulp.dest('./src/data'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('sequence', function(callback) {
  runSequence('yaml', 'jade', callback);
});


gulp.task('jade', function() {
  return gulp.src(srcPath.jade)
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
    // TODO - pretty: false for HTML minification
    .pipe(jade({ pretty: true }))
    .pipe(evilIcons())
    .pipe(gulp.dest(sendto.dist))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: sendto.dist
        }
        // This is here for special cases when reloading of other files is needed
        // ,
        // files: [
        //   themePath + '/**/*.php',
        //   themePath + '/js/**/*.js'
        //   ]
    });
});


gulp.task('imgs', function () {
  return gulp.src(srcPath.img)
    .pipe(changed(sendto.dist))
    // ngmin will only get the files that
    // changed since the last time it was run
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(sendto.dist + '/images'));
});


// Copy pfd
gulp.task('copy-js', function() {
    gulp.src(srcPath.js)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(sendto.dist + '/javascript'));
});


// Copy pfd
gulp.task('copy-pdf', function() {
    gulp.src(srcPath.pdf)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(sendto.dist + '/pdf'));
});


// Copy favicon
gulp.task('copy-favicon', function() {
    gulp.src(srcPath.favicon)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(sendto.dist));
});


// Copy robots
gulp.task('copy-robots', function() {
    gulp.src(srcPath.robots)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(sendto.dist));
});


// copy svg
gulp.task('copy-svg', function() {
    gulp.src(srcPath.svg)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(sendto.dist + '/svg'));
});


var options = { branch: 'master'};

// Deploy active branch to gh-pages branch
gulp.task('ghp', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages(options));
});



gulp.task('default', ['imgs', 'sass', 'yaml', 'jade', 'copy-js', 'copy-pdf', 'copy-favicon', 'copy-robots', 'copy-svg', 'browser-sync'], function () {
  gulp.watch(srcPath.yaml, ['sequence']);   // Run yaml and then jade tasks when yaml file changes
  gulp.watch(srcPath.img, ['imgs']);        // Run jade task when any jade file changes
  gulp.watch(srcPath.sass, ['sass']);       // Run stylus task when any stylus file changes
  gulp.watch(srcPath.jade, ['jade']);       // Run jade task when any jade file changes
    gulp.watch(srcPath.inc, ['jade']);       // Run jade task when any jade file changes
      gulp.watch(srcPath.layout, ['jade']);       // Run jade task when any jade file changes
});
