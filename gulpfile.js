// *************************************
//  Gulpfile
// *************************************

'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');

// -------------------------------------
//  Options
// -------------------------------------

var options = {

	html: {
		files       : '*.html'
	},

	sass: {
		files	    : 'src/scss/**/*.scss',
		destination : 'theme/css'
	},

	scripts: {
		files       : 'src/js/**/*.js',
		destination : 'theme/js'
	}
};

// -------------------------------------
//  Task: Serve
// -------------------------------------

gulp.task('serve', ['styles', 'scripts'], function() {
	browserSync.init({
		server: './'
	});

	gulp.watch(options.sass.files, ['styles']);
	gulp.watch(options.scripts.files, ['scripts']).on('change', browserSync.reload);
	gulp.watch(options.html.files).on('change', browserSync.reload);
});

// -------------------------------------
//  Task: Sass
// -------------------------------------

gulp.task('styles', function() {
	return gulp.src(options.sass.files)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest(options.sass.destination))
		.pipe(browserSync.stream());
});

// -------------------------------------
//  Task: Scrits
// -------------------------------------

gulp.task('scripts', function() {
	return gulp.src(options.scripts.files)
		.pipe(uglify())
		.pipe(gulp.dest(options.scripts.destination))
		.pipe(browserSync.stream());
});

// -------------------------------------
//  Task: Default
// -------------------------------------

gulp.task('default', ['serve']);
