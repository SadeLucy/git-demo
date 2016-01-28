/*
* @Author: Administrator
* @Date:   2016-01-27 13:11:42
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-27 19:46:18
*/

'use strict';
// 在gulpfile文件中载入我们所需要的工具文件包
// 例如：gulp、gulp-less等
// 这样方便我们将代码进行less编译 压缩 合并
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");

gulp.task('style',function() {
    gulp.src("src/style/*.less")
        // 转化成css文件
        .pipe(less())
        // 压缩
        .pipe(cssnano())
        .pipe(gulp.dest("dist/style"))
        .pipe(browserSync.reload({
      stream: true
    }));
  });


var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task('script',function() {
    gulp.src('src/script/*.js')
    // 将所选目录中的所有为.js格式的文件合并为命名为all.js中
        .pipe(concat('all.js'))
        // 将all.js文件压缩
        .pipe(uglify())
        // 然后保存到dist/script/目录中
        .pipe(gulp.dest('dist/script/'))
        .pipe(browserSync.reload({
      stream: true
    }));
  }) ;


// 复制图片
gulp.task('images',function() {
    gulp.src('src/images/*.png')
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.reload({
      stream: true
    }));

  });


// HTML的压缩
var htmlmin = require("gulp-htmlmin");
gulp.task('html',function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
      stream: true
    }));
  });



// 浏览器自动化同步
var browserSync = require('browser-sync');
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/style/*.less',['style']);
  gulp.watch('src/script/*.js',['script']);
  gulp.watch('src/images/*.*',['images']);
  gulp.watch('src/*.html',['html']);
});
