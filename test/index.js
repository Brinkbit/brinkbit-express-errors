'use strict';

const chai = require( 'chai' );
const sinonChai = require( 'sinon-chai' );
const sinon = require( 'sinon' );
const customErrors = require( 'brinkbit-custom-errors' );

const errorHandler = require( '../src' );

const expect = chai.expect;
chai.use( sinonChai );

describe( 'middleware', function() {
    describe( 'BadRequestError', function() {
        it( 'should return 400 on default', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.BadRequestError(), null, res );
            expect( res.status ).to.have.been.calledWith( 400 );
            expect( res.send ).to.have.been.calledWith({
                code: 400,
                error: 'Bad Request',
                description: 'Bad Request',
                type: 'invalid_request_error',
                details: {},
            });
        });

        it( 'should forward public error information', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.BadRequestError({
                message: 'Internal Message',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
            }), null, res );
            expect( res.status ).to.have.been.calledWith( 400 );
            expect( res.send ).to.have.been.calledWith({
                code: 400,
                error: 'Bad Request',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
                type: 'invalid_request_error',
            });
        });
    });

    describe( 'AuthenticationError', function() {
        it( 'should return 401 on default', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.AuthenticationError(), null, res );
            expect( res.status ).to.have.been.calledWith( 401 );
            expect( res.send ).to.have.been.calledWith({
                code: 401,
                error: 'Unauthorized',
                description: 'Unauthorized',
                type: 'authentication_error',
                details: {},
            });
        });

        it( 'should forward public error information', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.AuthenticationError({
                message: 'Internal Message',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
            }), null, res );
            expect( res.status ).to.have.been.calledWith( 401 );
            expect( res.send ).to.have.been.calledWith({
                code: 401,
                error: 'Unauthorized',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
                type: 'authentication_error',
            });
        });
    });

    describe( 'AuthorizationError', function() {
        it( 'should return 403 on default', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.AuthorizationError(), null, res );
            expect( res.status ).to.have.been.calledWith( 403 );
            expect( res.send ).to.have.been.calledWith({
                code: 403,
                error: 'Forbidden',
                description: 'Forbidden',
                type: 'invalid_request_error',
                details: {},
            });
        });

        it( 'should forward public error information', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.AuthorizationError({
                message: 'Internal Message',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
            }), null, res );
            expect( res.status ).to.have.been.calledWith( 403 );
            expect( res.send ).to.have.been.calledWith({
                code: 403,
                error: 'Forbidden',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
                type: 'invalid_request_error',
            });
        });
    });

    describe( 'NoResourceError', function() {
        it( 'should return 404 on default', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.NoResourceError(), null, res );
            expect( res.status ).to.have.been.calledWith( 404 );
            expect( res.send ).to.have.been.calledWith({
                code: 404,
                error: 'Not Found',
                description: 'Not Found',
                type: 'invalid_request_error',
                details: {},
            });
        });

        it( 'should forward public error information', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.NoResourceError({
                message: 'Internal Message',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
            }), null, res );
            expect( res.status ).to.have.been.calledWith( 404 );
            expect( res.send ).to.have.been.calledWith({
                code: 404,
                error: 'Not Found',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
                type: 'invalid_request_error',
            });
        });
    });

    describe( 'ConflictError', function() {
        it( 'should return 409 on default', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.ConflictError(), null, res );
            expect( res.status ).to.have.been.calledWith( 409 );
            expect( res.send ).to.have.been.calledWith({
                code: 409,
                error: 'Conflict',
                description: 'Conflict',
                type: 'invalid_request_error',
                details: {},
            });
        });

        it( 'should forward public error information', function() {
            const res = {
                headersSent: false,
                status: sinon.spy(),
                send: sinon.spy(),
            };
            errorHandler( new customErrors.ConflictError({
                message: 'Internal Message',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
            }), null, res );
            expect( res.status ).to.have.been.calledWith( 409 );
            expect( res.send ).to.have.been.calledWith({
                code: 409,
                error: 'Conflict',
                description: 'Public Description',
                details: [{
                    code: customErrors.types.missing_parameter,
                    parameter: 'custom',
                }],
                type: 'invalid_request_error',
            });
        });
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
        expect( res.send ).to.have.been.calledWith({
            code: 500,
            error: 'Internal Server Error',
            type: 'internal_error',
        });
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
        expect( res.send ).to.have.been.calledWith({
            code: 400,
            error: 'Bad Request',
            description: 'Bad Request',
            details: {},
            type: 'invalid_request_error',
        });
    });
});
