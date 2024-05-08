const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('server', function() {

    browserSync.init({
        server: "./dist"
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/**/*.+(sass|scss)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min"}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


gulp.task('minihtml', () => {
    return gulp.src('src/*.html')
      //.pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
  });

gulp.task('script', () =>{
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});

gulp.task('icons', () =>{
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons/'))
        .pipe(browserSync.stream());
});

gulp.task('image', () =>{
    return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () =>{
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(browserSync.stream());
});

gulp.task('css', () =>{
    return gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(sass|scss|css)", gulp.parallel('sass'));
    gulp.watch("src/*.html").on('change', gulp.parallel('minihtml'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('script'));
    gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
    gulp.watch('src/img/**/*').on('all', gulp.parallel('image'));
    gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
    gulp.watch('src/css/**/*').on('all', gulp.parallel('css'));
});

gulp.task('default', gulp.parallel('server', 'watch', 'sass', 'minihtml', 'script', 'fonts', 'image', 'icons', 'css'));