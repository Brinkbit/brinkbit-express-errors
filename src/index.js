'use strict';

const http = require( 'http' );
const logger = require( 'brinkbit-logger' )({ __filename });

exports = module.exports = function errorHandler( error, req, res, next ) { // eslint-disable-line complexity
    logger.debug( `handling error: "${error.message}"`, {
        status: error.status,
        message: error.message,
        code: error.code,
    });
    if ( process.env.NODE_ENV === 'debug' ) logger.debug( 'stack:', error );
    if ( res.headersSent ) {
        logger.debug( 'headers already sent, forwarding to next handler' );
        return next( error );
    }

    const responseErr = {};

    const code = (() => {
        if ( typeof error.status === 'number' && http.STATUS_CODES[error.status]) return error.status;
        else if ( error.code >= 400 ) return error.code;
        return 500;
    })();

    // if ( error.message ) responseErr.error_description = error.message;
    res.status( code );
    responseErr.error = http.STATUS_CODES[code];

    logger.info( `sending error response: "${error.message || responseErr.error}"`, responseErr );

    res.send( responseErr );
};
