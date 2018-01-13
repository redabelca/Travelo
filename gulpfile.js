"use strict";
let r = require,
  gulp = r('gulp'),
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
  gulp.watch(`${paths.base}**/*.pug`).on('change', p => {
    if (!plumber)  plumber = r('gulp-plumber');
    if (!pug)  pug = r('gulp-pug');
    gulp.src(`${paths.base}index.pug`).pipe(plumber()).pipe(pug({pretty: true})).pipe(gulp.dest(paths.dest)).pipe(browserSync.stream());
  });
  //scss
  gulp.watch(`${paths.base}**/*.scss`).on('change', p => {
    if (!sass)  sass = r('gulp-sass'); l(p);
    if (!concat)  concat = r('gulp-concat');
    gulp.src(`${paths.base}style.scss`).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest)).pipe(browserSync.stream());
  });
  //js
  let WebpackServerDeployed = 0;
  gulp.watch(`${paths.base}**/*`).on('change', p => {
    !WebpackServerDeployed && r('child_process').exec(`webpack-dev-server`, {stdio:'inherit'});
    !WebpackServerDeployed && l('server started at 8080');
    WebpackServerDeployed = 1;
  });
});
//--------------------------------------
gulp.task('pug',d=>{
    if (!plumber)  plumber = r('gulp-plumber');
    if (!pug)  pug = r('gulp-pug');
    gulp.src([`${paths.base}index.pug`,`${paths.base}pug-pages/*.pug`]).pipe(plumber()).pipe(pug({pretty: true})).pipe(gulp.dest(paths.dest)).on('finish',()=>{browserSync.stream();d();});
});
gulp.task('sass',d=>{
  if (!sass)  sass = r('gulp-sass');
  gulp.src([`${paths.base}partials/**/*.scss`,`${paths.base}style.scss`]).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest)).pipe(browserSync.stream()).on('finish',()=>{d();});
});
gulp.task('imgmin', d=>{
  if (!rename)  rename = r('gulp-rename');
  if (!imgmin)  imgmin = r('gulp-imagemin');
  if (!imageResize)  imageResize = r('gulp-image-resize');
  [150,300,500,800,1024,2000].map(v=>{
    gulp.src("./final/img/*.{jpg,jpeg,png}")
    .pipe(imageResize({
      width: v
    }))
    .pipe(rename((path) => {
      path.basename += `-${v}`;
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
});
//--------------------------------------
gulp.task('uglify', d=>{
  if (!uglify)  uglify = r('gulp-uglify');
  if (!order)  order = r('gulp-order');
  if (!concat)  concat = r('gulp-concat');
  if (!rename)  rename = r("gulp-rename");
  if (!autopolyfiller)  autopolyfiller = r('gulp-autopolyfiller');
  if (!merge)  merge = r('event-stream').merge;
  if (!plumber)  plumber = r('gulp-plumber');
  r('child_process').execSync('webpack -p',{stdio:'inherit'});
  let all = gulp.src(`${paths.dest}main.js`);
  let polyfills = all
    .pipe(autopolyfiller('poly.js', {
      browsers: ['last 10 versions', 'iOS >= 6']
    }));
  merge(polyfills, all)
    .pipe(order(['poly.js','main.js']))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(paths.dest)).on('finish',()=>{d();});
});
gulp.task('unCss', d=>{
  if (!uncss)  uncss = r('gulp-uncss');
  gulp.src(`${paths.base}style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      html: [paths.dest + 'index.html']
    }))
    .pipe(gulp.dest(paths.dest)).on('finish',()=>{d();});
});
gulp.task('finalCss', d=>{
  if (!autoprefixer)  autoprefixer = r('gulp-autoprefixer');
  if (!csso)  csso = r('gulp-csso');
  if (!combineMq)  combineMq = r('gulp-combine-mq');
  if (!sass)  sass = r('gulp-sass');
  if (!concat)  concat = r('gulp-concat');
  let cssFiles=[`${paths.dest}partials/scss/normalize.css`, `${paths.dest}partials/scss/type.css`, `${paths.dest}style.css`, `${paths.dest}partials/scss/effects.css`];
  gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(csso({
      restructure: true,
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 40 versions', 'iOS >= 6', 'android >= 2', '> 0.01%'],
      cascade: false,
      remove: false
    }))
    .pipe(combineMq())
    .pipe(gulp.dest(paths.dest)).on('finish',()=>{d();});
});
gulp.task('defer', d=>{
  gulp.src(paths.dest + 'index-critical.html')
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
      ignore: ['font-face']
    });
    d();
});
gulp.task('build',gulp.series('pug','sass','unCss', 'finalCss', 'uglify'));