var debug = require('debug')('app:store:apps');
var { find } = require('lodash-node');

var { Store, dispatcher } = require('flux-base');
var { LoadingStatus } = require('flux-base').constants;
var { AppsStatus } = require('../constants');

class AppsStore extends Store {
    constructor() {
        super({
            apps: [],
            status: AppsStatus.PENDING
        });
    }

    getError() {
        return this.get('error');
    }

    setError(e) {
        this.set('error', e);
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(value) {
        this.set('status', value);
    }

    getApps() {
        return this.get('apps');
    }

    setApps(apps) {
        this.set('apps', apps);
    }

    setApp(app) {
        var apps = this.getApps();
        apps.push(app);
        this.set('apps', apps);
    }

    getApp(id) {
        var apps = this.getApps();
        return find(apps, { Id: id });
    }
}

var store = new AppsStore();

store.dispatchToken = dispatcher.register(function(payload) {
    switch (payload.action) {
        case dispatcher.ActionTypes.APPS_CREATE:
            store.setStatus(AppsStatus.CREATING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_CREATE_SUCCESS:
            store.setStatus(AppsStatus.CREATE_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_CREATE_ERROR:
            store.setStatus(AppsStatus.CREATE_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_FETCH_ERROR:
            store.setStatus(AppsStatus.FETCH_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_FETCH:
            store.setStatus(AppsStatus.FETCHING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_FETCH_EMPTY:
            store.setStatus(AppsStatus.EMPTY);
            store.setApps([]);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_FETCH_SUCCESS:
            store.setStatus(AppsStatus.FETCH_END);
            store.setApps(payload.apps);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_DELETE:
            store.setStatus(AppsStatus.DELETING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_DELETE_SUCCESS:
            store.setStatus(AppsStatus.DELETE_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_DELETE_ERROR:
            store.setStatus(AppsStatus.DELETE_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_BUILD:
            store.setStatus(AppsStatus.BUILDING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_BUILD_SUCCESS:
            store.setStatus(AppsStatus.BUILD_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_BUILD_ERROR:
            store.setStatus(AppsStatus.BUILD_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_START:
            store.setStatus(AppsStatus.STARTING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_START_SUCCESS:
            store.setStatus(AppsStatus.START_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_START_ERROR:
            store.setStatus(AppsStatus.START_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;
 
        case dispatcher.ActionTypes.APPS_STOP:
            store.setStatus(AppsStatus.STOPPING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_STOP_SUCCESS:
            store.setStatus(AppsStatus.STOP_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_STOP_ERROR:
            store.setStatus(AppsStatus.STOP_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;
  
        case dispatcher.ActionTypes.APPS_LOGS:
            store.setStatus(AppsStatus.GETTING_LOGS);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_LOGS_SUCCESS:
            store.setStatus(AppsStatus.LOGS_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.APPS_LOGS_ERROR:
            store.setStatus(AppsStatus.LOGS_ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;
    }
});

module.exports = store;
