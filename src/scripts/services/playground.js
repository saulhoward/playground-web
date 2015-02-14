var debug = require('debug')('app:service:playground');
var Service = require('./Service');

class PlaygroundService extends Service {

    constructor() {
        super('com.myodc.service.playground');
    }

    getCode(id) {
        return this.call('read', {
            id: id
        })
        .then(res => res)
        .catch(err => {
            debug('getCode error', err);
            throw err;
        });
    }

    runCode(id, code, lang) {
        console.log('Running code...', id, code, lang);
        return this.call('/code/run', {
            id: id,
            text: code.join('\n'),
            lang: lang 
        })
        .then(res => res)
        .catch(err => {
            debug('runCode error', err);
            throw err;
        });
    }

    loadCode(id) {
        console.log('Loading code...', id);
        return this.call('/code/load', { id: id })
        .then(res => res)
        .catch(err => {
            debug('loadCode error', err);
            throw err;
        });
    }

    fetchApps() {
        console.log('fetching apps');
        return this.call('/apps/list', {})
        .then(res => res)
        .catch(err => {
            debug('loadCode error', err);
            throw err;
        });
    }

    createApp(params) {
        console.log('creating app', params);
        var req = {
            app: JSON.stringify(params.app),
            deploy: params.deploy
        };
        return this.call('/apps/create', req)
        .then(res => res)
        .catch(err => {
            debug('createApp error', err);
            throw err;
        });
    }

    shareCode(code, lang) {
        console.log('Sharing code...', code, lang);
        return this.call('/code/share', {
            text: code.join('\n'),
            lang: lang 
        })
        .then(res => res)
        .catch(err => {
            debug('shareCode error', err);
            throw err;
        });
    }

    deleteApp(id) {
        console.log('Deleting app...', id);
        return this.call('/apps/delete', { id: id })
        .then(res => res)
        .catch(err => {
            debug('deleteApp error', err);
            throw err;
        });
    }

    buildApp(id) {
        console.log('Building app...', id);
        return this.call('/apps/build', { id: id, deploy: true })
        .then(res => res)
        .catch(err => {
            debug('buildApp error', err);
            throw err;
        });
    }

    startApp(id) {
        console.log('Starting app...', id);
        return this.call('/apps/start', { id: id })
        .then(res => res)
        .catch(err => {
            debug('startApp error', err);
            throw err;
        });
    }

    stopApp(id) {
        console.log('Stopping app...', id);
        return this.call('/apps/stop', { id: id })
        .then(res => res)
        .catch(err => {
            debug('stopApp error', err);
            throw err;
        });
    }

    getAppLogs(id) {
        console.log('Getting app logs...', id);
        return this.call('/apps/logs', { id: id })
        .then(res => res)
        .catch(err => {
            debug('getAppLogs error', err);
            throw err;
        });
    }
}

module.exports = new PlaygroundService();
