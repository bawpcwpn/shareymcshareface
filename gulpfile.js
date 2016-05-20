var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task("babel", function() {
    return gulp.src("js/sharey.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("watching",function(){
    var watcher = gulp.watch('js/*.js', gulp.parallel('babel'));
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    return watcher;
});

gulp.task("minify",function(){
    return gulp.src('dist/sharey.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task("dev", gulp.series('watching'));

gulp.task("build", gulp.series('babel','minify'));