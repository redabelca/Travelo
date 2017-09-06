"use strict";
let r = require,
  gulp = r('gulp'),
  browserSync = r('browser-sync').create();
let plumber, rename, pug, sass, sourcemaps, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, tinypng, imageResize, l = console.log;

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
  //tinypng = r('gulp-tinypng');
  //imageResize = r('gulp-image-resize');
  l('all are loaded');
}, 7000);
var paths = {
  pug: './beta/pug/**/*.pug',
  html: './beta/',
  htmlServed: 'index.html',

  sass: './beta/scss/**/style.scss',
  css: './beta/styles/',

  factoryjs: './beta/factoryjs/',
  js: './beta/js/'
};

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

  gulp.watch(['./beta/index.html']).on('change', browserSync.reload);
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
      browsers: ['last 40 versions', 'ie >= 5','safari 5', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false,
      remove: false
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  let all = gulp.src([paths.factoryjs + 'lib.js', paths.factoryjs + 'main.js'])
    .pipe(plumber())
    .pipe(concat('main.js'));
  let polyfills = all
    .pipe(plumber())
    .pipe(autopolyfiller('poly.js', {
      browsers: ['last 40 versions', 'ie >= 5']
    }));
  return merge(polyfills, all)
    .pipe(plumber())
    .pipe(order([
            'poly.js',
            'main.js'
        ]))
    .pipe(concat('main.js'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.js));
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
gulp.task('img-resize', ["img-resize-150", "img-resize-300", "img-resize-640", "img-resize-768", "img-resize-1024", "img-resize-2000"]);
gulp.task("img-resize-150", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 150
    }))
    .pipe(rename(function (path) {
      path.basename += "-150";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task("img-resize-300", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 300
    }))
    .pipe(rename(function (path) {
      path.basename += "-300";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task("img-resize-640", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 640
    }))
    .pipe(rename(function (path) {
      path.basename += "-640";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task("img-resize-768", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 768
    }))
    .pipe(rename(function (path) {
      path.basename += "-768";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task("img-resize-1024", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 1024
    }))
    .pipe(rename(function (path) {
      path.basename += "-1024";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task("img-resize-2000", function () {
  gulp.src("./beta/factoryimg/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 2000
    }))
    .pipe(rename(function (path) {
      path.basename += "-2000";
    }))
    .pipe(gulp.dest("./beta/factoryimg"));
});
gulp.task('tinypng', function () {
  gulp.src('./beta/factoryimg/*.*')
    .pipe(tinypng('9esmu4Fj0pKzlDbPaqTpsOvKIHSA47gX'))
    .pipe(gulp.dest('./beta/img'));
});
