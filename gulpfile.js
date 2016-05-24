var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var del = require('del');
var notify = require("gulp-notify");

gulp.task("babel", function() {
    return gulp.src("app/js/sharey.js")
        .pipe(babel())
        .pipe(rename({suffix: '-compat'}))
        .pipe(gulp.dest("app/js"))
        .pipe(notify('Babel finished'));
});

gulp.task("watching",function(){
    var watcher = gulp.watch('app/js/sharey.js', gulp.series('babel'));
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    return watcher;
});

gulp.task("minify",function(){
    return gulp.src('app/js/sharey.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task("dev", gulp.series('watching'));

gulp.task("build", gulp.series('babel','useref','fonts'));