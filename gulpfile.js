var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jsonServer = require("gulp-json-srv");
var server = jsonServer.create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-clean-css');


gulp.task("start", function () {
    return gulp.src("src/db.json")
        .pipe(server.pipe());
});

gulp.task('sass', function () {
    return gulp.src('src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('sass/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('browserSync', ['start'], function () {
    browserSync({
        server: {
            baseDir: '../kursovik/src/',
        },
        port: 3000

    });

});
gulp.task('watch', ['browserSync'], function () {
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
});



gulp.task('build', function () {
    return gulp.src('src/*.html')
        .pipe(gulpif('src/*.js', uglify()))
        .pipe(gulpif('src/*.css', minifyCss()))
        .pipe(useref())
        .pipe(gulp.dest('src/dist'));
});


/*gulp.task('build', function () {
    return gulp.src('src/sass/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/dist'))



});*/
/*.pipe(gulp.src('src/*.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('src/dist'))*/
/*.pipe(gulp.src('src/*.html'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('src/dist'));*/