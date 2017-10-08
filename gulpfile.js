"use strict";
let r = require,
  gulp = r('gulp'),
  browserSync = r('browser-sync').create(),
  plumber, rename, pug, sass, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log,
  paths = {
    base: './beta/'
  };
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "./beta/index.html"
    }
  });
  gulp.watch('./beta/pug/*', (e) => {
    if (e.type === 'added' || e.type === 'changed') {
      l(e.path + ' ' + e.type);
      if (!plumber) {
        plumber = r('gulp-plumber');
      }
      if (!pug) {
        pug = r('gulp-pug');
      }

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
gulp.task('sass', () => {
  if (!sass) {
    sass = r('gulp-sass');
  }
  if (!uncss) {
    uncss = r('gulp-uncss');
  }
  gulp.src('./beta/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./final/styles'))
    .pipe(browserSync.stream());
});
gulp.task('jsSass', () => {
  if (!sass) {
    sass = r('gulp-sass');
  }
  l('sass loaded !');
  gulp.src('./beta/scss/jsEffect.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./final/styles'))
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
  l('sass and uncss loaded !');
  gulp.src('./beta/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      html: [paths.base + '*.html']
    }))
    .pipe(gulp.dest('./final/styles'));
  setTimeout(() => {
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

gulp.task('js', () => {
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
  if (!plumber) {
    plumber = r('gulp-plumber');
  }

  let all = gulp.src(paths.base + 'js/main.js').pipe(plumber()) /*.pipe(concat('main.js'))*/ ;
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
gulp.task('uglify', () => {
  if (!uglify) {
    uglify = r('gulp-uglify');
  }
  if (!rename) {
    rename = r("gulp-rename");
    l('loaded');
  }
  gulp.src('./final/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./final/js'))
    .pipe(browserSync.stream());
});
//--------------------------------------
gulp.task('svgmin', () => {
  gulp.src('./beta/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./beta/img'));
});
gulp.task("imgmin", () => {
  //makhasekch tbqa tpromptini dirict dir task l ga3 les sizes dial wp
  if(!svgmin){svgmin = r('gulp-svgmin');}
  if(!rename){rename = r('gulp-rename');}
  if(!imgmin){imgmin = r('gulp-imagemin');}
  if(!imageResize){imageResize = r('gulp-image-resize');}
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
//---------------------------------------
gulp.task('critical', () => {
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