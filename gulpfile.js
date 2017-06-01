var gulp         = require('gulp'),
	less         = require('gulp-less'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
    del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     =require('imagemin-pngquant'),
	cache        =require('gulp-cache'),
	autoprefixer =require('gulp-autoprefixer'),
    concatCss    = require('gulp-concat-css'),
	jsmin        = require('gulp-jsmin');


gulp.task('less', function(){
	 return gulp.src('app/less/main.less')
	 .pipe(less())
	 .pipe(autoprefixer(['last 2 version'],{cascade: true}))
	 .pipe(gulp.dest('app/css'))
	 .pipe(browserSync.reload({stream: true}))
});
gulp.task('js-min', function () {
    gulp.src(['app/js/libs.js'])
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'));
});
gulp.task('concat-css', function () {
  return gulp.src(['app/libs/owl.carousel.css', 'app/libs/owl.theme.default.css' ])
    .pipe(concatCss("libs.css"))
    .pipe(gulp.dest('app/css'));
});

gulp.task('script', function(){
	return gulp.src(
		['app/libs/jquery.min.js', 'app/libs/owl.carousel.js' ])
	    .pipe(concat('libs.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('app/js/'))
});
gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});
gulp.task('css-libs', function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
})
gulp.task('clean',  function(){
	return del.sync('dist')
})
gulp.task('clear',  function(){
	return cache.clearAll();
})
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
})
gulp.task('watch', ['browser-sync', 'css-libs', 'less', 'script'],  function(){
	gulp.watch('app/less/main.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload),
	gulp.watch('app/css/flexslider.css', browserSync.reload);
});
gulp.task('build', ['clean', 'img', 'css-libs',  'less', 'script' ], function(){
	var buildCss = gulp.src([ 
		'app/css/main.css',
		'app/css/libs.min.css',
	])
	.pipe(gulp.dest('dist/css'));
	
	var buildFont = gulp.src('app/font/**/*')
	.pipe(gulp.dest('dist/font'));
	
	var buldJs = gulp.src(['app/js/common.js', 'app/js/libs.min.js'])
	.pipe(gulp.dest('dist/js'));
	
	var buildHtml=gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))
	
})