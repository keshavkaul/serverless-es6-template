import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task("clear-babel-output", callback => {
    del(["bin/*", "!.gitkeep"])
        .then(()=>callback())
        .catch(callback);
});

gulp.task("copy-non-js", ["clear-babel-output"], () => {
    return gulp.src("src/**/*.!(js)")
        .pipe(gulp.dest("bin"));
});

gulp.task("babel-transpile", ["copy-non-js"], () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("bin"));
});

gulp.task("build", ["babel-transpile"]);
