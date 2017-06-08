import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import path from 'path';
import shell from 'gulp-shell';
import map from 'map-stream';


gulp.task("clear-output", callback => {
    del(["bin/*", "!.gitkeep"])
        .then(() => callback())
        .catch(callback);
});

gulp.task("copy-non-js", ["clear-output"], () => {
    return gulp.src("src/**/*.!(js)")
        .pipe(gulp.dest("bin"));
});

gulp.task("babel-transpile", ["clear-output"], () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("bin"));
});

gulp.task("build", ["babel-transpile", "copy-non-js"]);

gulp.task("deploy", ["deploy-serverless"]);

gulp.task("deploy-serverless", () => {
    return gulp.src("bin/**/*.yml")
        .pipe(map((data, cb) => cb(null, {...data, dirname: path.dirname(data.path)})))
        .pipe(shell('serverless deploy', {cwd: '<%= file.dirname %>'}));
});
