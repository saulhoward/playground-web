var React = require('react');

var AceEditor = require('./Editor/AceEditor');
var Status = require('./Editor/Status');
var { Panel, Button, Input } = require('react-bootstrap');

var { PlaygroundStatus } = require('../constants');
var appsStore = require('../stores/apps');

var appUtil = require('../utils/app');

module.exports = React.createClass({

    render() {
        var readonly = false,
            loadCode = this.props.loadCode;
        if (this.props.playgroundStatus == PlaygroundStatus.APP) {
            var app = appsStore.getApp(this.props.playgroundApp);
            loadCode = appUtil.getSourceCode(app);
            readonly = true;
        }

        var editorHeight = (this.props.windowHeight - 91);

        return (
            <Panel className="editor">
                <AceEditor
                    loadCode={ loadCode }
                    readonly={ readonly }
                    lang={ this.props.lang }
                    height={ editorHeight }
                />
                <Status
                    codeStatus={ this.props.codeStatus }
                    codeError={ this.props.codeError }
                />
            </Panel>
        );
    }
});
