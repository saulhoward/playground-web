var gulp = require('gulp');
var inject = require('gulp-inject-string');
var evil = require('evil-icons');

var iconSprite = function (gulp, options) {
    gulp.src(options.htmlSrc)
        .pipe(inject.after('<body>', evil.sprite))
        .pipe(gulp.dest(options.dest));
};

var config = {
    dev: false,
    browserSync: {
        https: false
    },
    tasks: [
        iconSprite
    ]
};
require('./node_modules/gulp-tasks/projects/simple')(gulp, config);

