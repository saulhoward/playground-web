var React = require('react');

var Confirm = require('../Confirm');
var { ButtonToolbar, ButtonGroup, Button, ModalTrigger } = require('react-bootstrap');

var appsActions = require('../../actions/apps');

module.exports = React.createClass({

    render: function() {
        var ConfirmDeleteModal = (
            <Confirm 
                title="Confirm deletion"
                text="Are you sure you want to delete this app?" 
                confirmButtonText="Delete"
                onConfirm={ this.deleteApp } 
            />
        );

        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button onClick={ this.showAppLogs }>Logs</Button>
                    <Button onClick={ this.buildApp }>Build</Button>
                    <Button onClick={ this.startApp }>Start</Button>
                    <Button onClick={ this.stopApp }>Stop</Button>
                    <ModalTrigger modal={ ConfirmDeleteModal }>
                        <Button>Delete</Button>
                    </ModalTrigger>
                </ButtonGroup>
            </ButtonToolbar>
        );
    },

    deleteApp: function() {
        appsActions.deleteApp(this.props.Id);
    },

    buildApp: function() {
        appsActions.buildApp(this.props.Id);
    },

    startApp: function() {
        appsActions.startApp(this.props.Id);
    },

    stopApp: function() {
        appsActions.stopApp(this.props.Id);
    },

    showAppLogs: function() {
        appsActions.getAppLogs(this.props.Id);
    }
});

