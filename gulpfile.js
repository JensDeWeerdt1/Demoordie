const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('./src/sass/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);