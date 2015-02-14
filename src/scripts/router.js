var debug = require('debug')('app:router');

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, NotFoundRoute } = Router;

var { SimpleApp, NotFoundPage } = require('flux-base');
var Index = require('./components/routes/Index');

var routes = (
    <Route name="app" path="/" handler={ SimpleApp }>
        <DefaultRoute handler={ Index } />
        <Route name="code" path="p/:codeID" handler={ Index } />
        <NotFoundRoute handler={ NotFoundPage } />
    </Route>
);

var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
});

module.exports = router;
