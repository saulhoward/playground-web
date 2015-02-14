var debug = require('debug')('app:service:events');
var URIjs = require('URIjs');
var Promise = require('bluebird');
var Service = require('./Service');

class EventsService extends Service {

    constructor() {
        this.eventSource = null;
        super('com.myodc.service.playground-events');
    }

    connect(id, onmessage) {
        if (this.eventSource) {
            this.eventSource.close();
        }

        var url = new URIjs(this.apiURL);
        url.protocol('ws');
        url.path('/events');
        url.query({ id: id });

        this.eventSource = new WebSocket(url.toString());
        this.eventSource.onmessage = onmessage;
        return new Promise((resolve, reject) => {
            this.eventSource.onopen = resolve;
            this.eventSource.onerror = reject;
        });
    }
}

module.exports = new EventsService();
