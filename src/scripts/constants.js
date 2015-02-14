var keyMirror = require('react/lib/keyMirror');

module.exports = {
    ActionTypes: keyMirror({
        PLAYGROUND_LOAD_SCRATCHPAD: null,
        PLAYGROUND_LOAD_APP: null,

        LANG_CHANGE: null,

        CODE_CHANGE: null,

        CODE_RUN: null,
        CODE_RUN_SUCCESS: null,
        CODE_RUN_ERROR: null,

        CODE_LOAD: null,
        CODE_LOAD_SUCCESS: null,
        CODE_LOAD_ERROR: null,

        CODE_SHARE: null,
        CODE_SHARE_SUCCESS: null,
        CODE_SHARE_ERROR: null,

        CODE_DEPLOY: null,
        CODE_DEPLOY_SUCCESS: null,
        CODE_DEPLOY_ERROR: null,

        EVENT_NEW: null,
        EVENT_ERROR: null,
        EVENT_CONNECT: null,
        EVENT_CLOSE: null,
        EVENT_OPEN: null,

        APPS_NEW: null,
        APPS_FETCH: null,
        APPS_FETCH_SUCCESS: null,
        APPS_FETCH_EMPTY: null,
        APPS_FETCH_ERROR: null,
        APPS_CREATE: null,
        APPS_CREATE_SUCCESS: null,
        APPS_CREATE_ERROR: null,
        APPS_DELETE: null,
        APPS_DELETE_ERROR: null,
        APPS_DELETE_SUCCESS: null,
        APPS_BUILD: null,
        APPS_BUILD_ERROR: null,
        APPS_BUILD_SUCCESS: null,
        APPS_START: null,
        APPS_START_ERROR: null,
        APPS_START_SUCCESS: null,
        APPS_STOP: null,
        APPS_STOP_ERROR: null,
        APPS_STOP_SUCCESS: null,
        APPS_LOGS: null,
        APPS_LOGS_ERROR: null,
        APPS_LOGS_SUCCESS: null,
    }),

    PlaygroundStatus: keyMirror({
        SCRATCHPAD: null,
        APP: null,
    }),

    AppsStatus: keyMirror({
        PENDING: null,
        EMPTY: null,
        FETCHING: null,
        FETCH_END: null,
        FETCH_ERROR: null,
        CREATING: null,
        CREATE_END: null,
        CREATE_ERROR: null,
        DELETING: null,
        DELETE_END: null,
        DELETE_ERROR: null,
        BUILDING: null,
        BUILD_END: null,
        BUILD_ERROR: null,
        STARTING: null,
        START_END: null,
        START_ERROR: null,
        STOPPING: null,
        STOP_END: null,
        STOP_ERROR: null,
        GETTING_LOGS: null,
        GET_LOGS_END: null,
        GET_LOGS_ERROR: null,
    }),

    CodeStatus: keyMirror({
        PENDING: null,
        ERROR: null,
        LOADING: null,
        LOAD_END: null,
        RUNNING: null,
        RUN_END: null,
        DEPLOYING: null,
        DEPLOY_END: null,
        SHARING: null,
        SHARE_END: null,
        SHARE_ERROR: null,
    }),

    EventsStatus: keyMirror({
        CONNECTING: null,
        OPEN: null,
        CLOSED: null,
        ERROR: null,
    }),

    CssClasses: {
        VALIDATION_ERROR: 'validation-error'
    }
};
