"use strict";
let r = require,
  gulp = r('gulp'),
  browserSync = r('browser-sync').create(),
  plumber, rename, pug, sass, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log,
  paths = {
    base: './beta/'
  };
//svgmin = r('gulp-svgmin'); //imgmin = r('gulp-imagemin'); //imageResize = r('gulp-image-resize');
gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "./beta/index.html"
    }
  });
  gulp.watch('./beta/pug/*', function (e) {
    if (e.type === 'added' || e.type === 'changed') {
      l(e.path + ' ' + e.type);
      if (!plumber) {
        plumber = r('gulp-plumber');
      }
      if (!pug) {
        pug = r('gulp-pug');
      }
      l('pug and plumber loaded !');

      gulp.src([e.path, './beta/pug/index.pug'])
        .pipe(plumber())
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(paths.base))
        .pipe(browserSync.stream());
    }
  });
  //scss
  gulp.watch(paths.base + 'scss/**/*.scss', ['sass']);
  gulp.watch('./beta/scss/jsEffect.scss', ['jsSass']);
  //js
  gulp.watch(paths.base + 'js/*.js', ['js']);

  gulp.watch(['*.html']).on('change', browserSync.reload);
});
//--------------------------------------
gulp.task('sass', function () {
  if (!sass) {
    sass = r('gulp-sass');
  }
  if (!uncss) {
    uncss = r('gulp-uncss');
  }
  l('sass and uncss loaded !');
  gulp.src('./beta/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./final/styles'))
    .pipe(browserSync.stream());
});
gulp.task('jsSass', function () {
  if (!sass) {
    sass = r('gulp-sass');
  }
  l('sass loaded !');
  gulp.src('./beta/scss/jsEffect.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./final/styles'))
    .pipe(browserSync.stream());
});
gulp.task('finalCss', function () {
  if (!autoprefixer) {
    autoprefixer = r('gulp-autoprefixer');
  }
  if (!csso) {
    csso = r('gulp-csso');
  }
  if (!combineMq) {
    combineMq = r('gulp-combine-mq');
  }
  if (!concatCss) {
    concatCss = r('gulp-concat-css');
  }
  if (!sass) {
    sass = r('gulp-sass');
  }
  if (!uncss) {
    uncss = r('gulp-uncss');
  }
  l('sass and uncss loaded !');
  gulp.src('./beta/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      html: [paths.base + '*.html']
    }))
    .pipe(gulp.dest('./final/styles'));
  setTimeout(function () {
    gulp.src(['./final/styles/normalize.css', './final/styles/type.css', './final/styles/jsEffect.css', './final/styles/style.css'])
      .pipe(concatCss('style.min.css'))
      .pipe(combineMq({
        beautify: true
      }))
      .pipe(csso({
        restructure: true,
        debug: true
      }))
      .pipe(autoprefixer({
        browsers: ['last 40 versions', 'iOS >= 6', 'android >= 2'],
        cascade: false,
        remove: false
      }))
      .pipe(gulp.dest('./final/styles'))
      .pipe(browserSync.stream());
  }, 10000);
});

gulp.task('js', function () {
  if (!concat) {
    concat = r('gulp-concat');
  }
  if (!order) {
    order = r('gulp-order');
  }
  if (!autopolyfiller) {
    autopolyfiller = r('gulp-autopolyfiller');
  }
  if (!merge) {
    merge = r('event-stream').merge;
    l('all loaded');
  }

  let all = gulp.src([paths.base + '/js/main.js']).pipe(plumber()) /*.pipe(concat('main.js'))*/ ;
  let polyfills = all
    .pipe(autopolyfiller('poly.js', {
      browsers: ['last 10 versions', 'iOS >= 6']
    }));
  return merge(polyfills, all)
    .pipe(order([
            'poly.js',
            'main.js'
        ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./final/js'))
    .pipe(browserSync.stream());
});
gulp.task('uglify', function () {
  if (!uglify) {
    uglify = r('gulp-uglify');
  }
  if (!rename) {
    rename = r("gulp-rename");
    l('loaded');
  }
  gulp.src(paths.base + 'js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./final/js'))
    .pipe(browserSync.stream());
});
//--------------------------------------
gulp.task('svgmin', function () {
  gulp.src('./beta/factoryimg/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./beta/img'));
});
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
      svgoPlugins: [{
        removeViewBox: false
      }],
      verbose: true,
      use: []
    }))
    .pipe(gulp.dest('./beta/img'));
});
//---------------------------------------
gulp.task('critical', function () {
  if (!critical) {
    var critical = r('critical');
  }
  critical.generate({
    inline: true,
    base: './beta/',
    src: 'index.html',
    dest: 'index-critical.html',
    dimensions: [
      {
        width: 320,
        height: 480
      }, {
        width: 768,
        height: 1024
      }, {
        width: 1280,
        height: 960
    }],
    minify: true,
    extract: false,
    ignore: ['font-face']
  });
});
gulp.task('build', ['critical', 'uglify', 'finalCss']);
