"use strict";
let r = require,gulp = r('gulp'),browserSync = r('browser-sync').create(),plumber, rename, pug, sass, sourcemaps, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log, paths = {
  pug: './beta/pug/**/*.pug',
  html: './beta/',
  htmlServed: 'index.html',

  sass: './beta/scss/**/style.scss',
  css: './beta/styles/',

  factoryjs: './beta/factoryjs/',
  js: './beta/js/'
};
setTimeout(function () {
  l('let\'s begin loading modules');
  plumber = r('gulp-plumber');
  rename = r("gulp-rename");
  l('general modules loaded');
  pug = r('gulp-pug');
  l('pug loaded');
  sass = r('gulp-sass');
  sourcemaps = r('gulp-sourcemaps');
  autoprefixer = r('gulp-autoprefixer');
  uncss = r('gulp-uncss');
  csso = r('gulp-csso');
  combineMq = r('gulp-combine-mq');
  concatCss = r('gulp-concat-css');
  l('css stuff loaded');
  uglify = r('gulp-uglify');
  concat = r('gulp-concat');
  order = r('gulp-order');
  autopolyfiller = r('gulp-autopolyfiller');
  merge = r('event-stream').merge;
  l('js stuff loaded');
  //svgmin = r('gulp-svgmin');
  //imgmin = r('gulp-imagemin');
  //imageResize = r('gulp-image-resize');
  l('all are loaded');
}, 7000);

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: "./beta/",
      index: paths.htmlServed
    }
  });
  gulp.watch(paths.pug, function (e) {
    if (e.type === 'added' || e.type === 'changed') {
      l(e.path + ' ' + e.type);
      gulp.src([e.path, './beta/pug/index.pug'])
        .pipe(plumber())
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(paths.html))
        .pipe(browserSync.stream());
    }
  });

  //scss
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./beta/scss/jsEffect.scss', ['jsSass']);

  //js
  gulp.watch(paths.factoryjs + '*.js', ['js']);
  //gulp.watch(paths.js + 'main.js', ['uglify']); //to optimize speed

  gulp.watch(['*.html']).on('change', browserSync.reload);
});
//--------------------------------------
gulp.task('pug', function () {
  gulp.src(paths.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html));
});

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    /*.pipe(combineMq({
      beautify: true
    }))
    .pipe(csso({
      restructure: true,
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 40 versions', 'ie >= 5'],
      cascade: false,
      remove: false
    }))*/
    .pipe(uncss({
      html: [paths.html + '*.html']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});
gulp.task('jsSass', function () {
  gulp.src('./beta/scss/jsEffect.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});
gulp.task('finalCss', function () {
  gulp.src([paths.css + '/normalize.css', paths.css + '/type.css', paths.css + '/jsEffect.css', paths.css + '/style.css'])
    .pipe(concatCss('style.min.css'))
    .pipe(combineMq({
      beautify: true
    }))
    .pipe(csso({
      restructure: true,
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 40 versions', 'ie >= 5', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false,
      remove: false
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  let all = gulp.src([paths.factoryjs + 'lib.js', paths.factoryjs + 'main.js']).pipe(plumber({errorHandler: onError}))
    .pipe(concat('main.js'));
  let polyfills = all
    .pipe(autopolyfiller('poly.js', {
      browsers: ['last 40 versions', 'ie >= 5']
    }));
  return merge(polyfills, all)
    .pipe(order([
            'poly.js',
            'main.js'
        ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.stream());
});
gulp.task('uglify', function () {
  gulp.src(paths.js + 'main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.stream());
});
//--------------------------------------
gulp.task('svgmin', function () {
  gulp.src('./beta/factoryimg/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./beta/img'));
});
//--------------------------------------
gulp.task("img-resize-all", function () {
  //all sizes of wp thumbnails
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 150
    }))
    .pipe(rename(function (path) {
      path.basename += "-150";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task('imgmin', function () {
  gulp.src('./beta/factoryimg/*')
    .pipe(imgmin({
    progressive: true,
    interlaced: true,
    optimizationLevel: 7,
    svgoPlugins: [{removeViewBox: false}],
    verbose: true,
    use: []
  }))
    .pipe(gulp.dest('./beta/img'));
});