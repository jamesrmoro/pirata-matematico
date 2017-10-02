var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var concatJs    = require('gulp-concat');
var notify      = require("gulp-notify");
var uglify      = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var jsOut       = 'src/js/*.js';

gulp.task('sass', function() {
    return gulp.src("src/sass/main.scss")
        .pipe( sass({
            outputStyle: 'compressed' // use 'compressed' para minificar o css
        }) )
        .on('error', sass.logError)
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "Css gerado!", onLast: true }));
});

gulp.task('js', function() {
    gulp.src(jsOut)
        .pipe(concatJs('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(notify({ message: "Js gerado!", onLast: true }));
});

gulp.task('watch', function() {
    gulp.watch(["src/sass/**/**/*.scss"], ['sass']);
    gulp.watch([jsOut], ['js']).on('change', browserSync.reload);
    gulp.watch(["./**/*.php", "*.html"]).on('change', browserSync.reload);
});

gulp.task('sprite-generator', function generateSpritesheets () {
  var spriteData = gulp.src('./sprite/*.png')
    .pipe(spritesmith({
      // retinaSrcFilter: './sprite/*-2x.png',

      imgName: 'sprite.png',
      // retinaImgName: 'sprite-2x.png',

      cssName: '_sprite.scss'
    }));

  spriteData.img.pipe(gulp.dest('./src/images'));
  spriteData.css.pipe(gulp.dest('./src/sass'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost/projetos/math",
        notify: false
    });
});

gulp.task('default', ['sass', 'js', 'watch', 'browser-sync']);
gulp.task('sprite', ['sprite-generator']);