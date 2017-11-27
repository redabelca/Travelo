"use strict";
let t=setTimeout,r = require,gulp = r('gulp'),{exec} = r('child_process'),browserSync = r('browser-sync').create(),plumber, rename, pug, sass, autoprefixer, uncss, csso, combineMq, concatCss, uglify, concat, order, autopolyfiller, merge, svgmin, imgmin, imageResize, l = console.log,
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
    open: false
  });
  let now=new Date().getSeconds();
  gulp.watch(`${paths.base}pug/**/*`).on('change', p => {
    if (!plumber) {
      plumber = r('gulp-plumber');
    }
    if (!pug) {
      pug = r('gulp-pug');
    }
    let reloadAllowed=new Date().getSeconds()-now>2 || new Date().getSeconds()-now<0;
    if(reloadAllowed){l(p);gulp.src(paths.base + 'pug/index.pug').pipe(plumber()).pipe(pug({pretty: true})).pipe(gulp.dest(paths.base)).pipe(browserSync.stream()); now=new Date().getSeconds();}else{l(new Date().getSeconds()-now);}
  });
  //scss
  gulp.watch(`${paths.base}scss/**/*`).on('change', p => {
    if (!sass) {
      sass = r('gulp-sass');
    }
    l(p);
    gulp.src(p).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream());
    t(() => gulp.src(paths.base + 'scss/style.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest + 'styles')).pipe(browserSync.stream()), 500);
  });
  //js
  let WebpackServerDeployed=0;
  gulp.watch(`${paths.base}js/**/*`).on('change', p => {
    !WebpackServerDeployed&&l('server started at 8080');
    !WebpackServerDeployed&&exec(`webpack-dev-server`, (err, stdout, stderr) => {
      err && l(err);
      stdout && l(stdout);
      stderr && l(stderr);
    });
    WebpackServerDeployed=1;
    // let reloadAllowed=new Date().getSeconds()-now>15 || new Date().getSeconds()-now<0;
    // if(reloadAllowed){
    //   exec(`webpack`, (err, stdout, stderr) => {
    //     err && l(err);
    //     stdout && l(stdout);
    //     stderr && l(stderr);
    //     l('Reloading------------------');
    //     browserSync.reload();
    //   });
    //   now=new Date().getSeconds();
    // }else{l(new Date().getSeconds()-now);}
  });
});
//--------------------------------------
gulp.task('svgmin', () => {
  if (!svgmin) {
    svgmin = r('gulp-svgmin');
  }
  gulp.src('./beta/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./beta/img'));
});
gulp.task('imgmin', (d) => {
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
      d();
  });
});
//--------------------------------------
gulp.task('uglify', (d) => {
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
    .pipe(gulp.dest(paths.dest + 'js'));
  d();
});
gulp.task('unCss', (d) => {
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
  d();
});
gulp.task('finalCss', (d) => {
  gulp.src([paths.dest + 'styles/normalize.css', paths.dest + 'styles/type.css', paths.dest + 'styles/effects.css', paths.dest + 'styles/style.css'])
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
    .pipe(gulp.dest(paths.dest + 'styles'));
  d();
});
gulp.task('defer', (d) => {
  gulp.src(paths.base + 'index.html')
    .pipe(r('gulp-defer')())
    .pipe(gulp.dest(paths.base));
  d();
});
gulp.task('build', gulp.series('unCss', 'finalCss', 'defer', 'uglify'), () => {
  r('critical').generate({
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
