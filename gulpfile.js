'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');

// Static Server / Watching files
gulp.task('serve', ['styles', 'scripts'], function() {
	browserSync.init({
		server: './'
	});

	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS
gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 2 versions', '> 2%'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

// Minify JS files
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);