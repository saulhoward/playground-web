var moment = require('moment');

var { dispatcher } = require('flux-base');
var codeStore = require('../stores/code');
var playgroundService = require('../services/playground');
var { CodeStatus } = require('../constants');

var eventsActions = require('../actions/events');

var idGen = require('../utils/idGen');

module.exports = {

    update: function(code) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.CODE_CHANGE,
            value: code,
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

            var id = idGen();
            var code = codeStore.getCode();
            var lang = codeStore.getLang();
            playgroundService.runCode(id, code, lang)
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

            eventsActions.connect(id)
            .catch(err => {
                console.log('caught err', err);
            });
        }
    },

    load: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.CODE_LOAD,
        });
        playgroundService.loadCode(id)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.CODE_LOAD_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            if (!!res) {
                var codeArr = res.text.split('\n');

                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.CODE_LOAD_SUCCESS,
                    code: codeArr,
                    lang: res.lang,
                });
            }
        });
    },

    shareCode: function() {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.CODE_SHARE,
        });

        var code = codeStore.getCode();
        var lang = codeStore.getLang();
        playgroundService.shareCode(code, lang)
        .catch(err => {
            var message = err.message ? err.message : err;
            dispatcher.handleServerAction({
                action: dispatcher.ActionTypes.CODE_SHARE_ERROR,
                error: message
            });
            throw err;
        })
        .then(res => {
            if (!!res && res.id) {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.CODE_SHARE_SUCCESS,
                    id: res.id,
                });
            }
        });
    }
};
