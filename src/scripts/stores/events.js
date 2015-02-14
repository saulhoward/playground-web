var debug = require('debug')('app:store:code');
var _ = require('lodash-node');

var { Store, dispatcher } = require('flux-base');
var { LoadingStatus } = require('flux-base').constants;
var { EventsStatus } = require('../constants');

class EventsStore extends Store {
    constructor() {
        super({
            archivedEvents: [],
            events: [],
            status: EventsStatus.CLOSED
        });
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(value) {
        this.set('status', value);
    }

    getEvents() {
        return this.get('events');
    }

    setEvent(event) {
        var events = this.getEvents();
        events.push(event);
        this.set('events', events);
    }

    getArchivedEvents() {
        return this.get('archivedEvents');
    }

    archive() {
        var events = this.get('events');
        if (events.length > 0) {
            var archived = this.get('archivedEvents');
            this.set('events', []);
            archived.push(events);
            this.set('archivedEvents', archived);
        }
    }
}

var store = new EventsStore();

store.dispatchToken = dispatcher.register(function(payload) {
    switch (payload.action) {
        case dispatcher.ActionTypes.EVENT_NEW:
            store.setStatus(EventsStatus.OPEN);
            store.setEvent(payload.event);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.EVENT_ERROR:
            store.setStatus(EventsStatus.ERROR);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.EVENT_CONNECT:
            store.setStatus(EventsStatus.CONNECTING);
            store.archive();
            store.emitChange();
            break;

        case dispatcher.ActionTypes.EVENT_OPEN:
            store.setStatus(EventsStatus.OPEN);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.EVENT_CLOSE:
            store.setStatus(EventsStatus.CLOSED);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_LOGS_SUCCESS:
            store.archive();
            store.setEvent(payload.logs);
            store.emitChange();
            break;
    }
});

module.exports = store;
