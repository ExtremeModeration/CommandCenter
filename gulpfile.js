var gulp = require('gulp'),
    bootstrap = require('bootstrap-styl'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var config = {
    bootstrap: {
        dist: function(uri) {
            return 'node_modules/bootstrap/dist' + uri;
        }
    },
    jquery: {
        dist: function(uri) {
            return 'node_modules/jquery/dist' + uri;
        }
    },
    flux: {

    },
    react: {
        dist: function(uri) {
            return 'node_modules/react/dist' + uri;
        }
    },
    react_bootstrap: {
        dist: function (uri) {
            return 'node_modules/react-bootstrap/dist' + uri;
        }
    }
};

gulp.task('jsx', function(){
    return gulp.src('src/jsx/**/*.jsx')
        .pipe(react())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
    gulp.src([
        'src/js/**/*.js'
    ])
        .pipe(gulp.dest('build'));
});

gulp.task('stylus', function(){
    gulp.src('src/styl/**/*.styl')
        .pipe(stylus({
            use:[bootstrap()]
        }))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('bootstrap', function(){
    gulp.src(config.bootstrap.dist('/fonts/*'))
        .pipe(gulp.dest('public/fonts'));

    gulp.src([
        config.bootstrap.dist('/js/bootstrap.min.js'),
        config.jquery.dist('/jquery.min.js')
    ])
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('react', function(){
    gulp.src(config.react.dist('/react-with-addons.min.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('react-bootstrap', ['react', 'bootstrap'], function(){
    gulp.src(config.react_bootstrap.dist('/react-bootstrap.min.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('bundle', function(){
    browserify({
        entries: ['./build/app.js']
    })
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(streamify(uglify('app.min.js')))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch', ['stylus','react-bootstrap','js', 'jsx', 'bundle'], function(){
    gulp.watch(['src/styl/**/*.styl'], ['stylus']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/jsx/**/*.jsx'], ['jsx']);

    gulp.watch(['./build/*.js'], ['bundle']);
});