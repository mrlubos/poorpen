const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const reload = browserSync.reload;

gulp.task('build', () => gulp.src('./src/**.js')
  .pipe(concat('PoorPen.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/')));

gulp.task('watch', ['build'], () => {
	gulp.watch('./src/**.js', ['build']).on('change', reload);
});

gulp.task('default', ['watch'], () => {
	return console.log('Gulp is running!');
});