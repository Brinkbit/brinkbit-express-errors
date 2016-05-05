'use strict';

const gulp = require( 'gulp' );
const mocha = require( 'gulp-mocha' );
const gulpNSP = require( 'gulp-nsp' );
const isparta = require( 'isparta' );
const istanbul = require( 'gulp-istanbul' );
const documentation = require( 'gulp-documentation' );

gulp.task( 'nsp', cb => {
    gulpNSP({
        package: `${__dirname}/package.json`,
        stopOnError: false,
    }, cb );
});

gulp.task( 'pre-test', () => {
    return gulp.src( 'src/**/*.js' )
    .pipe( istanbul({
        instrumenter: isparta.Instrumenter,
    }))
    .pipe( istanbul.hookRequire());
});

gulp.task( 'docs', () => {
    return gulp.src( 'src/**/*.js' )
    .pipe( documentation({ format: 'md' }))
    .pipe( gulp.dest( 'docs' ));
});

gulp.task( 'test', ['pre-test'], () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'test';
    gulp.src( 'test/**/*.js', { read: false })
    .pipe( mocha())
    .pipe( istanbul.writeReports())
    .once( 'error', error => {
        console.log( error.message, error.stack ); // eslint-disable-line no-console
        process.exit( 1 );
    })
    .once( 'end', () => {
        process.exit( 0 );
    });
});
