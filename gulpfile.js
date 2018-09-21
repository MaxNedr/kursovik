var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jsonServer = require("gulp-json-srv");
var server = jsonServer.create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var minifyjs = require('gulp-js-minify');
var htmlmin = require('gulp-htmlmin');

gulp.task("start", function () {
    return gulp.src("db.json")
        .pipe(server.pipe());
});

gulp.task('sass', function () {
    return gulp.src('sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('sass/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('browserSync', ['start'], function () {
    browserSync({
        server: {
            baseDir: '../kursovik/',
        },
        port: 3000

    });

});
gulp.task('watch', ['browserSync'], function () {
    gulp.watch('sass/*.sass', ['sass']);
    gulp.watch('*.html', browserSync.reload);
});


gulp.task('build', function () {
    return gulp.src('sass/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.src('../*.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.src('../*.html'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));

});