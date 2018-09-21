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
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'sass',
        },
        port: 9000

    });

});
gulp.task('watch', ['browserSync', 'start'], function () {
    gulp.watch('sass/*.sass', ['sass']);
    gulp.watch('*.html', browserSync.reload);
});