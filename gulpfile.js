/**
 * Created by WangMing on 15/12/9.
 */
var gulp=require('gulp');
var webpack = require('webpack');
var del=require('del');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpackconfig = require('./webpack.config');

/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
  del(['./dist/*.js','./dist/*.css','./dist/*.map']).then(paths => {
    console.log('删除文件和文件夹成功\n', paths.join('\n'));
    cb();
  });
});

/**
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
  webpack(webpackconfig, cb)
});

/**
 *  压缩css文件
 */
gulp.task('style',function() {
  gulp.src('./dist/style.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

/**
 *  压缩js文件
 */
gulp.task('script',function(){
  gulp.src('./dist/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webpack'], function() {
  gulp.start('style','script')
});