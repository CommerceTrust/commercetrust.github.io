var dest = "./build";
var src  = './src';
//var neat = require('node-neat').includePaths;
//var bourbon = require('node-bourbon');

module.exports = {
  browserSync: {
    server: {
      // Specify a port if needed
      // port: ####,
      // Serve up our build folder
      baseDir: dest
    }
  },
  styleGuides: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest,
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      //includePaths: ['sass'].concat(neat),
      imagePath: '/images' // Used by the image-url helper
    },
    postProcess: { // Using PLEEEASE for the postProcess
      autoprefixer: {
        browsers: ['ie >= 8', 'ie_mob >= 10', 'ff >= 3.6', 'chrome >= 10', 'safari >= 5.1', 'opera >= 11', 'ios >= 7', 'android >= 4.1', 'bb >= 10']
      },
      filters: true,
      rem: true,
      pseudoElements: true,
      opacity: true,

      import: true,
      minifier: false,
      mqpacker: true,

      sourcemaps: false,

      next: {
        calc: false,
        customProperties: false,
        customMedia: false,
        colors: false
      }
    }
  },
  stylus: {
    main: src + "/stylus/app.styl",
    src: src + "/stylus/*.styl",
    dest: dest
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/htdocs/**/*.jade",
    dest: dest
  },
  inc: {
    src: src + "/inc/**/*.jade" // This is used for watching Jade includes
  },
  layout: {
    src: src + "/layout/**/*.jade" // This is used for watching Jade includes
  },
  data: {
    src: src + "/data/index.json.jade" // This is used for watching Jade includes
  },
  yaml: {
    src: src + "/data/data.yaml", // This is used for watching Jade includes
    dest: src + "/data"
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/global.coffee',
      dest: dest,
      outputName: 'global.js',
      // Additional file extentions to make optional
      extensions: ['.coffee'],
      // list of modules to make require-able externally
      require: ['jquery']
    }, {
      entries: src + '/javascript/page.js',
      dest: dest,
      outputName: 'page.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  },
  deploy: {
    bulidSrc: dest + '/**/*,
    dest: dest
  }
};
