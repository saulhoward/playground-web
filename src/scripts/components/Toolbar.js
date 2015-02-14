var React = require('react');

var {
    Panel, Button, ButtonGroup, ButtonToolbar 
} = require('react-bootstrap');
var LangSelector = require('./Toolbar/LangSelector');
var RunButton = require('./Toolbar/RunButton');
var ShareButton = require('./Toolbar/ShareButton');
var AppToolbar = require('./Apps/AppToolbar');

var { PlaygroundStatus } = require('../constants');

module.exports = React.createClass({

    render: function () {
        var toolbar;
        if (this.props.playgroundStatus == PlaygroundStatus.APP) {
            toolbar = (
                <AppToolbar Id={this.props.playgroundApp} />
            );
        } else {
            toolbar = (
                <ButtonToolbar>
                    <ButtonGroup>
                        <RunButton codeStatus={ this.props.codeStatus } />
                    </ButtonGroup>
                    <ButtonGroup>
                        <LangSelector lang={ this.props.lang } />
                    </ButtonGroup>
                    <ButtonGroup>
                        <ShareButton />
                    </ButtonGroup>
                </ButtonToolbar>
            );
        }
        return (
            <Panel className="toolbar">
            { toolbar }
            </Panel>
        );
    }
});
