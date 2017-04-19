var gulp = require('gulp');
	uglify = require('gulp-uglify');
	concat = require('gulp-concat');
	imagemin = require('gulp-imagemin');
	csso = require('gulp-csso');
	sass = require('gulp-sass');
	livereload = require('gulp-livereload');
	rename = require('gulp-rename');
	connect = require('gulp-connect');
	opn = require('opn');
	bourbon = require('node-bourbon')




/*sass*/
gulp.task('sass', function(){
	gulp.src('app/css/style.sass')
		.pipe(sass({
			 includePaths:bourbon.includePaths
			}).on('error', sass.logError))
		.pipe(csso())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('app/css/'))
})


/*imagemin*/
gulp.task('images', function(){
	gulp.src('app/img/**/*')
		.pipe(imagemin)
		.pipe(gulp.dest('app/img/'))
})

/*js lib*/
gulp.task('lib', function(){
	gulp.src([
		'bower_components/jquery/dist/jquery.js',
		])
	.pipe(concat('lib.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'))
})

/*watch*/
gulp.task('watch', function(){
	gulp.watch(['app/css/*.sass'], ['sass']);
	gulp.watch(['app/img/*/*'], ['images']);
	gulp.watch(['app/**/*'], ['fileReload']);
})

/*connect*/
gulp.task('connect', function(){
	connect.server({
		root:'app/',
		livereload:true,
		port:8888,
		open:{
    		browser: "chromium"
		}
	});
	opn('http:/localhost:8888');
})

/*reload server*/
gulp.task('fileReload', function(){
	gulp.src([
		'app/*.html',
		'app/js/*.js',
		'app/css/*.css',
		'app/img/*.*'
		])
		.pipe(connect.reload());
})

/*default*/
gulp.task('default', ['connect', 'watch', 'lib']);