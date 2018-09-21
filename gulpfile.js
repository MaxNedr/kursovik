var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jsonServer = require("gulp-json-srv");
var server = jsonServer.create();

gulp.task("start", function(){
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

/*
gulp.task('build', function() {
  return gulp.src('src/*.html')
    .pipe(htmlMinifier({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'));
  return gulp.src('src/js/*.js')
    .pipe(jsConcat('scripts.js'))
    .pipe(jsMinification())
    .pipe(gulp.dest('./dist/js/'));
  return gulp.src('src/css/*.css')
    .pipe(cssMinify({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'));
});*/