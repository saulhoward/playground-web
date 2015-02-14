var React = require('react');
var { Navbar } = require('react-bootstrap');

var Icon = require('./Icon');

var appsStore = require('../stores/apps');
var { PlaygroundStatus } = require('../constants');

var appUtil = require('../utils/app');

module.exports = React.createClass({
    render: function () {
        var iconName;

        var title = '',
            subtitle = ''
        if (this.props.playgroundStatus == PlaygroundStatus.SCRATCHPAD) {
            title = 'Scratchpad';
            subtitle = this.props.lang;
            iconName = 'ei-pencil';
        } else {
            var app = appsStore.getApp(this.props.playgroundApp);
            title = this.props.playgroundApp;
            var type = appUtil.getSourceType(app);
            if (type == 'Code') {
                subtitle = app.Source.Code.Lang + ' code';
            } else {
                subtitle = type;
            }
            iconName = 'ei-archive';
        }

        return (
            <Navbar className="app-header" fluid>
                <Icon name={ iconName } size="m" />
                <h4 className="app-id">{ title } <small>{ subtitle }</small></h4>
            </Navbar>
        );
    }
});
