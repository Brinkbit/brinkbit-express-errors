const http = require( 'http' );
const logger = require( 'brinkbit-logger' ).configure();
const customErrors = require( 'brinkbit-custom-errors' );

exports = module.exports = function errorHandler( error, req, res, next ) { // eslint-disable-line complexity
    logger.error( `handling error: "${error.message}"`, {
        status: error.status,
        message: error.message,
        description: error.description,
        details: error.details,
        type: error.type,
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
        else if ( error.code >= 400 && http.STATUS_CODES[error.code]) return error.code;
        return 500;
    })();

    res.status( code );

    responseErr.code = code;
    responseErr.error = http.STATUS_CODES[code];
    responseErr.type = error.type || customErrors.types.DEFAULTS[code];

    if ( code === 500 ) {
        logger.emerg( '500 error', {
            status: error.status,
            message: error.message,
            description: error.description,
            details: error.details,
            type: error.type,
            code: error.code,
            stack: error.stack,
        });
    }
    else {
        responseErr.description = error.description || responseErr.error;
        responseErr.details = error.details || {};
        logger.info( 'sending error response', {
            response: error.message || responseErr.description,
        });
    }

    res.send( responseErr );
};
