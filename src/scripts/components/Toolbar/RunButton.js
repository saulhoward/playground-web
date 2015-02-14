var React = require('react');
var { Button } = require('react-bootstrap');
var LaddaButton = require('react-ladda');
var Icon = require('../Icon');

var codeActions = require('../../actions/code');
var { CodeStatus } = require('../../constants');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            codeStatus: CodeStatus.PENDING,
        };
    },

    render: function () {
        var active;
        switch (this.props.codeStatus) {
            case CodeStatus.RUNNING:
                active = true;
                break;
            default:
                active = false;
        }

        return (
            <LaddaButton
                active={ active }
                style="expand-right"
                spinnerColor="#fff"
                >
                <Button bsStyle="primary" className="button-icon" onClick={ this.runCode }>
                    <Icon name="ei-play" /> Run
                </Button>
            </LaddaButton>
        );
    },

    runCode(e) {
        e.nativeEvent.stopImmediatePropagation();
        codeActions.runCode();
    }
});
