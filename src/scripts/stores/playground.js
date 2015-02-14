var debug = require('debug')('app:store:playground');
var _ = require('lodash-node');

var { Store, dispatcher } = require('flux-base');
var { LoadingStatus } = require('flux-base').constants;
var { PlaygroundStatus } = require('../constants');

class PlaygroundStore extends Store {
    constructor() {
        super({
            scratchpad: true,
            app: '',
            status: PlaygroundStatus.SCRATCHPAD,
        });
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(s) {
        this.set('status', s);
    }

    getError() {
        return this.get('error');
    }

    setError(e) {
        this.set('error', e);
    }

    // currently loaded app id
    getApp() {
        return this.get('app');
    }

    setApp(id) {
        this.set('app', id);
    }
}

var store = new PlaygroundStore();

store.dispatchToken = dispatcher.register(function(payload) {
    switch (payload.action) {
        case dispatcher.ActionTypes.PLAYGROUND_LOAD_SCRATCHPAD:
            store.setStatus(PlaygroundStatus.SCRATCHPAD);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.PLAYGROUND_LOAD_APP:
            store.setStatus(PlaygroundStatus.APP);
            store.setApp(payload.id);
            store.emitChange();
            break;
    }
});

module.exports = store;
