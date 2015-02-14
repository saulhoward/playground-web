var React = require('react');

var List = require('./Apps/List');
var Status = require('./Apps/Status');
var NewApp = require('./Toolbar/NewApp');
var { Button, Nav, NavItem, ModalTrigger } = require('react-bootstrap');

var playgroundActions = require('../actions/playground');

var { PlaygroundStatus } = require('../constants');

module.exports = React.createClass({

    getNewAppButton: function() {
        var newAppModal = (
            <NewApp
                status={ this.props.appsStatus }
                error={ this.props.appsError }
            />
        );
        return (
            <ModalTrigger modal={ newAppModal }>
                <Button className="new-app-button">New</Button>
            </ModalTrigger>
        );
    },

    onSelect: function() {
        playgroundActions.loadScratchpad()
    },

    render: function () {
        var scratchpadActiveKey = 0;
        if (this.props.playgroundStatus == PlaygroundStatus.SCRATCHPAD) {
            scratchpadActiveKey = 1;
        }

        var newAppButton = this.getNewAppButton();

        return (
            <div className="apps-explorer">
                <Status status={ this.props.appsStatus } />
                <Nav
                    className="scratchpad-list"
                    bsStyle="pills"
                    stacked
                    activeKey={scratchpadActiveKey}
                    onSelect={this.onSelect}
                >
                    <NavItem eventKey={1} href="/home">
                        <h5>Scratchpad</h5>
                        <p>Write anything and run it</p>
                    </NavItem>
                </Nav>
                <h4>
                <span>Apps</span>
                { newAppButton }
                </h4>
                <List
                    apps={ this.props.apps }
                    playgroundApp={this.props.playgroundApp} 
                    playgroundStatus={this.props.playgroundStatus} 
                />
            </div>
        );
    }
});
