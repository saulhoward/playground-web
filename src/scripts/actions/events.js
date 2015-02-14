var moment = require('moment');

var { dispatcher } = require('flux-base');
var eventsStore = require('../stores/events');
var { EventsStatus } = require('../constants');

var eventsService = require('../services/events');

const readyState = [
    EventsStatus['CONNECTING'],
    EventsStatus['OPEN'],
    EventsStatus['CLOSED']
];

module.exports = {

    connect: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.EVENT_CONNECT,
        });

        // on event callback
        var addEvent = function(e) {
            var event = JSON.parse(e.data);
            dispatcher.handleViewAction({
                action: dispatcher.ActionTypes.EVENT_NEW,
                event: event,
            });

            // also read the WebSocket object (this)
            switch (this.readyState) {
                case 0: // CONNECTING
                case 1: // OPEN
                case 2: // CLOSING
                    break;
                case 3: // CLOSED
                    dispatcher.handleViewAction({
                        action: dispatcher.ActionTypes.EVENT_CLOSE,
                    });
                    break;
            }

            // finally, check if this is a final event
            if (event.Body && event.Body.match(/^\[Program exited/)) {
                dispatcher.handleViewAction({
                    action: dispatcher.ActionTypes.EVENT_CLOSE,
                });
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.CODE_RUN_SUCCESS,
                });
            }
        };

        return eventsService.connect(id, addEvent)
        .catch(err => {
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.EVENT_ERROR,
            });
            throw err;
        })
        .then(res => {
            if (!!res) {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.EVENT_OPEN,
                });
            }
        });

    },

    changeLang: function(lang) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.LANG_CHANGE,
            value: lang,
        });
    },

    showError: function(message) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.SHOW_ERROR,
            message: message,
        });
    },

    runCode: function() {
        if (codeStore.getStatus() != CodeStatus.CODE_RUNNING) {
            dispatcher.handleViewAction({
                action: dispatcher.ActionTypes.CODE_RUN,
            });

            var code = codeStore.getCode();
            var lang = codeStore.getLang();
            playgroundService.runCode(code, lang)
            .catch(err => {
                var message = err.message ? err.message : err;
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.CODE_RUN_ERROR,
                    error: message
                });
                throw err;
            })
            .then(res => {
                if (!!res) {
                    dispatcher.handleServerAction({
                        action: dispatcher.ActionTypes.CODE_RUN_SUCCESS,
                    });
                }
            });
        }
    }
};
