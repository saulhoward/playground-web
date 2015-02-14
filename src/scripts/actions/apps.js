var moment = require('moment');

var { dispatcher } = require('flux-base');

var playgroundService = require('../services/playground');

var eventsActions = require ('./events');

module.exports = {
    fetch: function() {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_FETCH,
        });
        playgroundService.fetchApps()
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_FETCH_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            if (!!res) {
                if (res.apps && res.apps.length) {
                    dispatcher.handleServerAction({
                        action: dispatcher.ActionTypes.APPS_FETCH_SUCCESS,
                        apps: res.apps,
                    });
                } else {
                    dispatcher.handleServerAction({
                        action: dispatcher.ActionTypes.APPS_FETCH_EMPTY,
                    });
                }
            }
        });
    },

    createApp: function(params) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_CREATE,
        });
        playgroundService.createApp(params)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_CREATE_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            console.log('finished create', res);
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_CREATE_SUCCESS,
            });
            this.fetch();

            eventsActions.connect(params.app.id)
            .catch(err => {
                console.log('caught err', err);
            });
        });
    },

    deleteApp: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_DELETE,
            id: id
        });
        playgroundService.deleteApp(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_DELETE_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            console.log('finished delete', res);
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_DELETE_SUCCESS,
            });
            this.fetch();
        });

        eventsActions.connect(id)
        .catch(err => {
            console.log('caught err', err);
        });
    },

    buildApp: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_BUILD,
            id: id
        });
        playgroundService.buildApp(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_BUILD_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_BUILD_SUCCESS,
            });
        });

        eventsActions.connect(id)
        .catch(err => {
            console.log('caught err', err);
        });
    },

    startApp: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_START,
            id: id
        });
        playgroundService.startApp(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_START_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_START_SUCCESS,
            });
        });

        eventsActions.connect(id)
        .catch(err => {
            console.log('caught err', err);
        });
    },

    stopApp: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_STOP,
            id: id
        });
        playgroundService.stopApp(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_STOP_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_STOP_SUCCESS,
            });
        });

        eventsActions.connect(id)
        .catch(err => {
            console.log('caught err', err);
        });
    },

    getAppLogs: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.APPS_LOGS,
            id: id
        });
        playgroundService.getAppLogs(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_LOGS_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            console.log('logs', res);
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.APPS_LOGS_SUCCESS,
                logs: res,
            });
        });

        eventsActions.connect(id)
        .catch(err => {
            console.log('caught err', err);
        });
    }

};

