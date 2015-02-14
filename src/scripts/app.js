var debug = require('debug')('app:app');
var actionTypes = require('./constants').ActionTypes;
var router = require('./router');
var { dispatcher } = require('flux-base');

var React = require('react');

if (process.env.NODE_ENV === 'development') {
    var dbg = 'app:*';
    require('debug').enable(dbg);
    debug('starting with debug', dbg);
}

dispatcher.addActionTypes(actionTypes);

router.run(function(Handler, state) {
    // RouterActions.routeChange({routerState: state});
    React.render(
        <Handler params={state.params} query={state.query} />,
        document.getElementById('app')
    );
});
