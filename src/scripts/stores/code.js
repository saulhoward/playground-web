var debug = require('debug')('app:store:code');
var _ = require('lodash-node');

var { Store, dispatcher } = require('flux-base');
var { LoadingStatus } = require('flux-base').constants;
var { CodeStatus } = require('../constants');

var demoLang = 'ruby';
var demoCode = [
    'class HelloWorld',
    '\tdef initialize(name)',
    '\t\t@name = name.capitalize',
    '\tend',
    '\tdef sayHi',
    '\t\tputs "Hello #{@name}!"',
    '\tend',
    'end',
    '',
    'hello = HelloWorld.new("World")',
    'hello.sayHi',
];

class CodeStore extends Store {
    constructor() {
        super({
            code: [],
            loadCode: demoCode,
            lang: demoLang,
            error: '',
            status: CodeStatus.PENDING,
            shareID: '',
        });
    }

    getShareID() {
        return this.get('shareID');
    }

    setShareID(id) {
        this.set('shareID', id);
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(value) {
        this.set('status', value);
    }

    getError() {
        return this.get('error');
    }

    setError(e) {
        this.set('error', e);
    }

    getLang() {
        return this.get('lang');
    }

    setLang(value) {
        this.set('lang', value);
    }

    getCode() {
        return this.get('code');
    }

    setCode(code) {
        this.set('code', code);
    }

    getLoadCode() {
        return this.get('loadCode');
    }

    setLoadCode(code) {
        this.set('loadCode', code);
    }
}

var store = new CodeStore();

store.dispatchToken = dispatcher.register(function(payload) {
    switch (payload.action) {
        case dispatcher.ActionTypes.LANG_CHANGE:
            store.set('lang', payload.value);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_CHANGE:
            store.setCode(payload.value);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_RUN:
            store.setStatus(CodeStatus.RUNNING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_RUN_ERROR:
            store.setStatus(CodeStatus.ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_RUN_SUCCESS:
            store.setStatus(CodeStatus.RUN_END);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_LOAD:
            store.setStatus(CodeStatus.LOADING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_LOAD_ERROR:
            store.setStatus(CodeStatus.ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_LOAD_SUCCESS:
            store.setStatus(CodeStatus.LOAD_END);
            store.setCode(payload.code);
            store.setLoadCode(payload.code);
            store.set('lang', payload.lang);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_SHARE:
            store.setStatus(CodeStatus.SHARING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_SHARE_ERROR:
            store.setStatus(CodeStatus.ERROR);
            store.set('error', payload.error);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_SHARE_SUCCESS:
            store.setStatus(CodeStatus.SHARE_END);
            store.setShareID(payload.id);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_DEPLOY:
            store.setStatus(CodeStatus.DEPLOYING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_DEPLOY_ERROR:
            store.setStatus(CodeStatus.ERROR);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.CODE_DEPLOY_SUCCESS:
            store.setStatus(CodeStatus.DEPLOY_END);
            store.emitChange();
            break;
    }
});

module.exports = store;
