'use strict';

const chai = require( 'chai' );
const sinonChai = require( 'sinon-chai' );
const sinon = require( 'sinon' );
const customErrors = require( 'brinkbit-custom-errors' );

const errorHandler = require( '../src' );

const expect = chai.expect;
chai.use( sinonChai );

describe( 'middleware', function() {
    it( 'should return 400 on BadRequestError', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new customErrors.BadRequestError(), null, res );
        expect( res.status ).to.have.been.calledWith( 400 );
        expect( res.send ).to.have.been.calledWith({ error: 'Bad Request' });
    });

    it( 'should return 401 on AuthenticationError', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new customErrors.AuthenticationError(), null, res );
        expect( res.status ).to.have.been.calledWith( 401 );
        expect( res.send ).to.have.been.calledWith({ error: 'Unauthorized' });
    });

    it( 'should return 403 on AuthorizationError', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new customErrors.AuthorizationError(), null, res );
        expect( res.status ).to.have.been.calledWith( 403 );
        expect( res.send ).to.have.been.calledWith({ error: 'Forbidden' });
    });

    it( 'should return 404 on NoResourceError', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new customErrors.NoResourceError(), null, res );
        expect( res.status ).to.have.been.calledWith( 404 );
        expect( res.send ).to.have.been.calledWith({ error: 'Not Found' });
    });

    it( 'should return 409 on ConflictError', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new customErrors.ConflictError(), null, res );
        expect( res.status ).to.have.been.calledWith( 409 );
        expect( res.send ).to.have.been.calledWith({ error: 'Conflict' });
    });

    it( 'should call next if headers have been sent', function() {
        const res = {
            headersSent: true,
        };
        const next = sinon.spy();
        const error = new customErrors.ConflictError();
        errorHandler( error, null, res, next );
        expect( next ).to.have.been.calledWith( error );
    });

    it( 'should return 500 on unsupported error', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        errorHandler( new Error(), null, res );
        expect( res.status ).to.have.been.calledWith( 500 );
        expect( res.send ).to.have.been.calledWith({ error: 'Internal Server Error' });
    });

    it( 'should support codes defined as statuses', function() {
        const res = {
            headersSent: false,
            status: sinon.spy(),
            send: sinon.spy(),
        };
        const error = new Error();
        error.status = 400;
        errorHandler( error, null, res );
        expect( res.status ).to.have.been.calledWith( 400 );
        expect( res.send ).to.have.been.calledWith({ error: 'Bad Request' });
    });
});
