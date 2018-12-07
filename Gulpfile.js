var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./ressources/saas/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./content/assets/css'));
});

gulp.task('default', function () {
  gulp.watch('./ressources/saas/**/*.scss', ['sass']);
});