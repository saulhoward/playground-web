var { dispatcher } = require('flux-base');

module.exports = {

    loadScratchpad: function() {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.PLAYGROUND_LOAD_SCRATCHPAD,
        });
    },

    loadApp: function(id) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.PLAYGROUND_LOAD_APP,
            id: id
        });
    },
};

