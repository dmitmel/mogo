/* eslint-env node */

const path = require('path');
const globby = require('globby');
const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const es = require('event-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const rimraf = require('rimraf');

function p(...pathSegments) {
  return path.resolve(__dirname, ...pathSegments);
}

function _p(...pathSegments) {
  return path.resolve(...pathSegments);
}

const paths = {
  html: p('index.html'),
  srcRoot: p('src'),
  src: {
    styles: p('src', 'scss'),
    js: p('src', 'js')
  },
  distRoot: p('dist'),
  dist: {
    styles: p('dist', 'css'),
    js: p('dist', 'js')
  }
};

const browsers = ['>1%', 'ie >= 10', 'Firefox ESR'];

gulp.task('styles:build', function() {
  return gulp
    .src(_p(paths.src.styles, '**', '[^_]*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(
      sourcemaps.write('.', {
        sourceRoot: path.relative(paths.dist.styles, paths.src.styles)
      })
    )
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('styles:clean', function(cb) {
  rimraf(paths.dist.styles, cb);
});

gulp.task('styles:watch', ['styles:build'], function() {
  watch([paths.src.styles], function() {
    return gulp.start('styles:build');
  });
});

gulp.task('js:build', function(done) {
  function compile(entry) {
    return browserify({ entries: [entry], debug: true })
      .transform('babelify', { presets: ['es2015'] })
      .bundle()
      .on('error', done)
      .pipe(source(path.basename(entry)))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(
        sourcemaps.write('.', {
          sourceRoot: path.relative(paths.dist.js, __dirname)
        })
      )
      .pipe(gulp.dest(paths.dist.js));
  }

  globby(_p(paths.src.js, '**', '[^_]*.bundle.js'))
    .then(entries => entries.map(compile))
    .then(tasks =>
      es
        .merge(tasks)
        .on('end', done)
        .on('end', browserSync.reload)
    )
    .catch(err => done(err));
});

gulp.task('js:clean', function(cb) {
  rimraf(paths.dist.js, cb);
});

gulp.task('js:watch', ['js:build'], function() {
  watch([paths.src.js], function() {
    return gulp.start('js:build');
  });
});

gulp.task('build', ['styles:build', 'js:build']);
gulp.task('clean', ['styles:clean', 'js:clean']);
gulp.task('watch', ['styles:watch', 'js:watch']);
gulp.task('default', ['build']);

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: './',
    ghostMode: {
      scroll: false
    }
  });

  watch([paths.html], function() {
    browserSync.reload();
  });
});
