"use strict";
let t = setTimeout,
  r = require,
  gulp = r('gulp'),
  {
    exec
  } = r('child_process'),
  browserSync = r('browser-sync').create(),
  plumber, rename, pug, sass, autoprefixer, uncss, csso, combineMq, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log,
  paths = {
    base: 'beta/',
    dest: 'final/'
  };
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "final/index.html"
    },
    open: false
  });
  gulp.watch(`${paths.base}pug/**/*`).on('change', p => {
    if (!plumber) {
      plumber = r('gulp-plumber');
    }
    if (!pug) {
      pug = r('gulp-pug');
    }
    gulp.src(paths.base + 'pug/index.pug').pipe(plumber()).pipe(pug({pretty: true})).pipe(gulp.dest(paths.dest)).pipe(browserSync.stream());
  });
  //scss
  gulp.watch(`${paths.base}scss/**/*`).on('change', p => {
    if (!sass) {
      sass = r('gulp-sass');
    }
    l(p);
    gulp.src(p).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream()).on('finish',()=>{
      gulp.src(paths.base + 'scss/style.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream());
    });
    // t(() => gulp.src(paths.base + 'scss/style.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream()), 500);
  });
  //js
  let WebpackServerDeployed = 0;
  gulp.watch(`${paths.base}js/**/*`).on('change', p => {
    !WebpackServerDeployed && l('\nserver started at 8080\n');
    !WebpackServerDeployed && exec(`webpack-dev-server`, () => {});
    !WebpackServerDeployed && WebpackServerDeployed = 1;
    l('\np\n');
  });
});
//--------------------------------------
gulp.task('pug',d=>{
    if (!plumber) {
      plumber = r('gulp-plumber');
    }
    if (!pug) {
      pug = r('gulp-pug');
    }
    gulp.src(paths.base + 'pug/*.pug').pipe(plumber()).pipe(pug({pretty: true})).pipe(gulp.dest(paths.dest)).pipe(browserSync.stream()).on('finish',()=>{d()});
});
gulp.task('sass',d=>{
  if (!sass) {
    sass = r('gulp-sass');
  }
  gulp.src(`${paths.base}scss/**/*.scss`).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream()).on('finish',()=>{d();});
});
gulp.task('svgmin', () => {
  if (!svgmin) {
    svgmin = r('gulp-svgmin');
  }
  gulp.src('./final/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./final/img'));
});
gulp.task('imgmin', d=>{
  //makhasekch tbqa tpromptini dirict dir task l ga3 les sizes dial wp
  if (!rename) {
    rename = r('gulp-rename');
  }
  if (!imgmin) {
    imgmin = r('gulp-imagemin');
  }
  if (!imageResize) {
    imageResize = r('gulp-image-resize');
  }
  gulp.src("./final/img/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: 2000
    }))
    .pipe(rename((path) => {
      path.basename += ``;
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
    .pipe(gulp.dest("./final/img")).on('finish',()=>{d();});
});
//--------------------------------------
gulp.task('uglify', d=>{
  if (!uglify) {
    uglify = r('gulp-uglify');
  }
  if (!order) {
    order = r('gulp-order');
  }
  if (!concat) {
    concat = r('gulp-concat');
  }
  if (!rename) {
    rename = r("gulp-rename");
    l('loaded');
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
  let all = gulp.src(paths.dest + 'js/main.js');
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
    .pipe(gulp.dest(paths.dest + 'js')).on('finish',()=>{d();});
});
gulp.task('unCss', d=>{
  if (!autoprefixer) {
    autoprefixer = r('gulp-autoprefixer');
  }
  if (!csso) {
    csso = r('gulp-csso');
  }
  if (!combineMq) {
    combineMq = r('gulp-combine-mq');
  }
  if (!sass) {
    sass = r('gulp-sass');
  }
  if (!uncss) {
    uncss = r('gulp-uncss');
  }
  gulp.src(`${paths.base}scss/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      html: [paths.dest + 'index.html']
    }))
    .pipe(gulp.dest(paths.dest + 'styles')).on('finish',()=>{d();});
});
gulp.task('finalCss', d=>{
  if (!concat) {
    concat = r('gulp-concat');
  }
  let cssFiles=[paths.dest + 'styles/partials/normalize.css', paths.dest + 'styles/partials/type.css', paths.dest + 'styles/style.css', paths.dest + 'styles/effects.css'];
  gulp.src(cssFiles)
    .pipe(csso({
      restructure: true,
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 40 versions', 'iOS >= 6', 'android >= 2', '> 0.01%'],
      cascade: false,
      remove: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(combineMq())
    .pipe(gulp.dest(paths.dest + 'styles')).on('finish',()=>{d();});
});
gulp.task('defer', d=>{
  gulp.src(paths.dest + 'index.html')
    .pipe(r('gulp-defer')())
    .pipe(gulp.dest(paths.dest)).on('finish',()=>{d();});
});
gulp.task('critical',d=>{
    r('critical').generate({
      inline: true,
      base: './',
      src: 'final/index.html',
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
    d();  
});
gulp.task('build',gulp.series('unCss', 'finalCss', 'uglify'));