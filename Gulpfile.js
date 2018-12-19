var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./ressources/saas/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./content/assets/css'));
});

gulp.task('combine', function() {
  return gulp.src('./ressources/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./content/assets/js'));
});

gulp.task('default', function () {
  gulp.watch('./ressources/js/**/*.js', ['combine']);
  gulp.watch('./ressources/saas/**/*.scss', ['sass']);
});