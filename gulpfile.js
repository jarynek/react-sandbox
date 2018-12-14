let gulp = require('gulp');
let webpack = require('webpack-stream');
let minify = require('gulp-minify');
let less = require('gulp-less');
let path = require('path');
let cleanCSS = require('gulp-clean-css');
let watch = require('gulp-watch');


gulp.task('scripts', ()=>{
    return gulp.src('./public/js/*.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest('./assets/js'))
});

gulp.task('styles', ()=>{
    return watch('./public/css/*.less', function () {
        gulp.src('./public/css/*.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('./assets/css'));
        console.log('styles done');
    });
});

gulp.task('dev', gulp.parallel('scripts', 'styles'));