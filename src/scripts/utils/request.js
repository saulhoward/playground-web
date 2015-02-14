var Promise = require('bluebird');
var request = require('xhr');
var status = require('statuses');

class HttpError extends Error {
    constructor(code, message) {
        this.name = 'HttpError';
        this.code = code || status(message);
        this.message = message || status[ code ] || 'Error ' + code;
        Error.captureStackTrace && Error.captureStackTrace(this, HttpError);
    }
};

class ClientError extends HttpError {
    constructor(code, message) {
        code = code || 400;
        super(code, message);
        this.name = 'ClientError';
        Error.captureStackTrace && Error.captureStackTrace(this, ClientError);
    }
};

class ServerError extends HttpError {
    constructor(code, message) {
        code = code || 500;
        super(code, message);
        this.name = 'ServerError';
        Error.captureStackTrace && Error.captureStackTrace(this, ServerError);
    }
};

class RequestError extends Error {
    constructor(message) {
        this.name = 'RequestError';
        this.message = message;
        Error.captureStackTrace && Error.captureStackTrace(this, RequestError);
    }
};

module.exports = function(options) {
    return new Promise(function(resolve, reject) {
        request(options, function(err, xhr, body) {
            if (xhr.statusCode === 0) {
                return reject(new RequestError('Internal XHR Error'));
            }
            if (xhr.statusCode >= 400 && xhr.statusCode < 500) {
                return reject(new ClientError(xhr.statusCode, body));
            }
            if (xhr.statusCode >= 500 && xhr.statusCode < 600) {
                return reject(new ServerError(xhr.statusCode, body));
            }
            resolve([xhr, body]);
        });
    });
};
