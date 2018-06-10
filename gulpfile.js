var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload;

var concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify');

gulp.task('scripts', function () {
	return gulp.src('./src/**.js')
			.pipe(concat('PoorPen.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['scripts'], function () {
	gulp.watch('./src/**.js', ['scripts']).on('change', reload);
});

gulp.task('default', ['watch'], function () {
	return console.log('Gulp is running!');
});