"use strict";
let r = require,
  gulp = r('gulp'),
  browserSync = r('browser-sync').create(),
  plumber, rename,pug, sass, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log,
  critical,
  paths = {
    base: 'beta/',
    dest: 'final/'
  };
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "beta/index.html"
    },
    open:false
  });
  gulp.watch(paths.base + 'pug/**/*', e => {
    if (e.type === 'added' || e.type === 'changed') {
      l(e.path + ' ' + e.type);
      if (!plumber) {
        plumber = r('gulp-plumber');
      }
      if (!pug) {
        pug = r('gulp-pug');
      }

      gulp.src([/*e.path,*/ './beta/pug/index.pug'])
        .pipe(plumber())
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(paths.base))
        .pipe(browserSync.stream());
    }
  });
  //scss
  gulp.watch(paths.base + 'scss/**/*', e => {
    if (e.type === 'added' || e.type === 'changed') {
      if (!sass) {
        sass = r('gulp-sass');
      }
      gulp.src([e.path,paths.base+'scss/style.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest + 'styles'))
        .pipe(browserSync.stream());
    }
  });
  //js
  gulp.watch(paths.base + 'js/**/*.js', ['js']);

  gulp.watch(['index.html']).on('change', browserSync.reload);
});
gulp.task('js', () => {
  gulp.src(paths.base + 'js/main.js')
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(browserSync.stream());
});
//--------------------------------------
gulp.task('svgmin', () => {
  gulp.src('./beta/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./beta/img'));
});
gulp.task('imgmin', () => {
  //makhasekch tbqa tpromptini dirict dir task l ga3 les sizes dial wp
  if (!svgmin) {
    svgmin = r('gulp-svgmin');
  }
  if (!rename) {
    rename = r('gulp-rename');
  }
  if (!imgmin) {
    imgmin = r('gulp-imagemin');
  }
  if (!imageResize) {
    imageResize = r('gulp-image-resize');
  }
  var prompt = r('prompt');
  prompt.start();
  prompt.get(['sizes'], (er, res) => {
    gulp.src("./beta/img/*.{jpg,jpeg,png}")
      .pipe(imageResize({
        width: res.sizes
      }))
      .pipe(rename((path) => {
        path.basename += "-" + res.sizes;
      }))
      .pipe(imgmin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 7,
        svgoPlugins: [{
          removeViewBox: false
      }],
        verbose: true,
      }))
      .pipe(gulp.dest("./beta/img"));
  });
});
//--------------------------------------
gulp.task('defer', function() {
  var defer=r('gulp-defer');
  gulp.src(paths.base+'index.html')
   .pipe(defer())
   .pipe(gulp.dest(paths.dest));
});
gulp.task('uglify', () => {
  if (!uglify) {
    uglify = r('gulp-uglify');
  }
  if (!concat) {
    concat = r('gulp-concat');
  }
  if (!rename) {
    rename = r("gulp-rename");
    l('loaded');
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
  if (!plumber) {
    plumber = r('gulp-plumber');
  }
  let all=gulp.src(paths.dest + 'js/main.js');
  let polyfills = all
  .pipe(autopolyfiller('poly.js', {
      browsers: ['last 10 versions', 'iOS >= 6']
    }));
  merge(polyfills, all)
    .pipe(order([
            'poly.js',
            'main.js'
        ]))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(browserSync.stream());
});
gulp.task('finalCss', () => {
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
  gulp.src('./beta/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      html: [paths.base + 'index.html']
    }))
    .pipe(gulp.dest(paths.dest + 'styles'));
    gulp.watch(paths.dest+'styles/style.css',e => {
      l(e.path+' '+e.type);
    gulp.src([paths.dest + 'styles/normalize.css', paths.dest + 'styles/type.css', paths.dest + 'styles/jsEffect.css', paths.dest + 'styles/style.css'])
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
      .pipe(gulp.dest(paths.dest + 'styles'))
      .pipe(browserSync.stream());
  });
});
gulp.task('critical', () => {
  if (!critical) {
    critical = r('critical');
  }
  critical.generate({
    inline: true,
    base: './',
    src: 'beta/index.html',
    dest: 'final/index-critical.html',
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
gulp.task('build', ['uglify', 'finalCss', 'critical']);