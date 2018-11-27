const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-clean-css');
const sass = require('gulp-sass');
const less = require('gulp-less');
const stylus = require('gulp-stylus');

const PATH = {
  HTML: 'src/**/*.html',
  JS: 'src/**/*.js',
  LESS: 'src/**/*.less',
  SCSS: 'src/**/*.scss',
  SASS: 'src/**/*.sass',
  STYLUS: 'src/**/*.stylus'
};

gulp.task('babel', () => {
  gulp.src(PATH.JS)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat(`chunk${(new Date).getTime()}.js`))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
  gulp.src(PATH.LESS)
    .pipe(less())
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', () => {
  gulp.src([ PATH.SASS, PATH.SCSS ])
    .pipe(sass().on('error', function(err) {
      console.warn(`[SASS-ERROR] ${err.file}`);
      console.warn(`[LINE] line: ${err.line}, column ${err.column}`);
      console.warn(`[MESSAGE] ${err.message}`);
      this.emit('end');
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('stylus', () => {
  gulp.src(PATH.STYLUS)
    .pipe(stylus())
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
  gulp.watch(PATH.JS, [ 'babel' ]);
  gulp.watch(PATH.LESS, [ 'less' ]);
  gulp.watch([ PATH.SASS, PATH.SCSS ], [ 'sass' ]);
  gulp.watch(PATH.STYLUS, [ 'stylus' ]);
});

gulp.task('default', [ 'babel', 'less', 'sass', 'stylus', 'watch' ])
