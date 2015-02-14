var React = require('react');
var { Button } = require('react-bootstrap');
var LaddaButton = require('react-ladda');

var codeActions = require('../../actions/code');
var { CodeStatus } = require('../../constants');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            codeStatus: CodeStatus.PENDING,
        };
    },

    render: function () {
        var active = false;
        switch (this.props.codeStatus) {
            case CodeStatus.SHARING:
                active = true;
                break;
            default:
                active = false;
        }

        return (
            <LaddaButton
                active={ active }
                style="expand-right"
                spinnerColor="#333"
                >
                <Button onClick={ this.shareCode }>Share</Button>
            </LaddaButton>
        );
    },

    shareCode(e) {
        e.nativeEvent.stopImmediatePropagation();
        codeActions.shareCode();
    }
});
