# brinkbit-express-errors

> Express error handling middleware for http errors

# Install

```
npm i --save brinkbit-express-errors
```

# Overview

Designed for API usage, ingests brinkbit-custom-errors and any application errors that may have slipped through and sends the appropriate response to the client.

# Usage

```javascript
const errorWare = require( 'brinkbit-express-errors' );
const customErrors = require( 'brinkbit-custom-errors' );
const express = require( 'express' );

const app = express();

app.get( '/404', ( req, res, next ) => {
    next( new customErrors.NoResourceError({
        message: '404 for UI',
        type: 'ui_error',
    }));
});
app.get( '/api/404', ( req, res, next ) => {
    next( new customErrors.NoResourceError({
        message: 'This message will only be logged internally',
        description: 'This message will be forwarded to the client',
        type: customErrors.type.invalid_request_error,
        details: {
            _resource: customErrors.type.missing_resource,
        },
    }));
})

// if you want to handle errors with an alternate response (i.e. UI)
// simply drop that middleware higher in the stack and forward any other types of errors
app.use(( err, req, res, next )=> {
    if ( err.type !== 'ui_error' ) return next( err );
    else {
        // return UI
    }
});
app.use( errorWare );
```
