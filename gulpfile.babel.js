import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task("clear-babel-output", callback => {
    
    del(["bin/*", "!.gitkeep"])
        .then(()=>callback())
        .catch(callback);
});

gulp.task("babel-transpile", ["clear-babel-output"], () => {
    return gulp.src("src/*")
        .pipe(babel())
        .pipe(gulp.dest("bin"));
});

gulp.task("build", ["babel-transpile", "clear-babel-output"]);
