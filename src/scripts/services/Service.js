var debug = require('debug')('app:service');

var { sessionStore } = require('flux-base');

var map = require('lodash-node/modern/collections/map');
var merge = require('lodash-node/modern/objects/merge');
var defaults = require('lodash-node/modern/objects/defaults');
var clone = require('lodash-node/modern/objects/clone');

var Promise = require('bluebird');
var URIjs = require('URIjs');
var { stringify } = require('querystring');

var request = require('../utils/request');

// Setup config
var myodcConfig = defaults(window.myodcConfig || {}, {
    'apiBaseURL': 'https://localhost'
});

class Service {

    constructor(name) {
        this.apiURL = new URIjs(myodcConfig.apiBaseURL).normalize().toString();

        if (name) {
            this.name = name;
        } else {
            throw new Error('Service name not set');
        }

        super();
    }

    get store() {
        return Service.store;
    }

    set store(store) {
        Service.store = store;
    }

    get defaultParams() {
        return {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'POST',
            timeout: 10000
        }
    }

    getParams(endpoint, req) {
        var url = new URIjs(this.apiURL);
        url.path(endpoint);

        return {
            url: url.toString(),
            body: stringify(req)
        };

        // var id = this.store.session.id;
        // if (id) {
        //     url += '&session_id=' + encodeURIComponent(id);
        // }
        // return {
        //     url: url.toString(),
        //     body: stringify({
        //         service: this.name,
        //         endpoint: endpoint,
        //         request: JSON.stringify(req)
        //     })
        // };
    }

    call(endpoint, req = {}, options = {}) {
        if (this.store == null) throw new Error('Missing Service store');
        if (!endpoint) throw new Error('Missing endpoint');

        return request(merge({},
                this.defaultParams,
                this.getParams(endpoint, req),
                options // overrides
            ))
            .spread((res, body) => body)
            .then(JSON.parse);
    }
}

Service.prototype.store = sessionStore;

module.exports =  Service;
