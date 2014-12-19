var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(
            sass({
                style: 'compressed',
                "sourcemap=none": true,
                loadPath: [
                    './resources/sass',
                    config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                    config.bowerDir + '/fontawesome/scss',
                ]
             })
            .on('error', notify.onError(function(error) {
                return 'Error: ' + error.message;
            }))
        )
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    return gulp.src([
            config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',
            config.bowerDir + '/jquery/dist/jquery.min.*'
        ])
        .pipe(gulp.dest('./public/js'));
});

// rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css', 'js']);

