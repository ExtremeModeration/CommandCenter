'use strict';

var gulp = require('gulp');
var del = require('del');


var path = require('path');

// load plugins
var $ = require('gulp-load-plugins')();
var bootstrap = require('bootstrap-styl');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),
    sourceFile = './src/js/application.jsx',
    destFolder = './dist/scripts',
    destFileName = 'application.js';

gulp.task('styles', function() {
    return gulp.src('src/styl/main.styl')
        .pipe($.stylus({
            use: [bootstrap()]
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});

var bundler = watchify(browserify({
    entries: [sourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
    return bundler.bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
}

gulp.task('scripts', rebundle);

gulp.task('buildScripts', function() {
    return browserify(sourceFile)
        .bundle()
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('fonts', function() {
    return gulp.src([
        'bower_components/bootstrap-stylus/fonts/*.*',
        'src/fonts/**/*'
    ])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function(cb) {
    $.cache.clearAll();
    cb(del.sync(['dist/styles', 'dist/scripts', 'dist/images', 'dist/fonts', 'dist/index.html']));
});

gulp.task('bundle', ['styles', 'scripts', 'bower'], function() {
    var assets = $.useref.assets();

    return gulp.src('./src/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('buildBundle', ['styles', 'buildScripts', 'bower'], function() {
    var assets = $.useref.assets();

    return gulp.src('./src/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
    gulp.src('bower_components/**/*.js', {
        base: 'bower_components'
    })
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('watch', ['html', 'fonts', 'bundle'], function() {
    gulp.watch('src/*.html', ['html']);

    gulp.watch(['src/styl/**/*.styl'], ['styles']);
});

// Build
gulp.task('build', ['html', 'buildBundle', 'fonts'], function() {
    gulp.src('dist/scripts/application.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('dist/scripts'));
});

// Default task
gulp.task('default', ['clean', 'build']);
