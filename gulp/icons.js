'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var icons = require('gulp-material-icons');
var tasks = require('./icons.json');

gulp.task('icons', function() {
    return icons({tasks: tasks})
        .pipe(gulp.dest('./icons/'));
});