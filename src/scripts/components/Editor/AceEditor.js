var React = require('react');

var { isArray, isEqual } = require('lodash-node');

var ace = require('brace');
require('brace/mode/ruby');
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/golang');
require('brace/mode/perl');
require('brace/mode/python');
require('brace/mode/c_cpp');
require('brace/mode/plain_text');
require('brace/theme/tomorrow');

var codeActions = require('../../actions/code');

function setLang(session, lang) {
    switch (lang) {
        case 'javascript':
            session.setMode('ace/mode/javascript');
        break;
        case 'python':
            session.setMode('ace/mode/python');
        break;
        case 'golang':
            session.setMode('ace/mode/golang');
        break;
        case 'ruby':
            session.setMode('ace/mode/ruby');
        break;
        case 'c':
            session.setMode('ace/mode/c_cpp');
        break;
        case 'perl':
            session.setMode('ace/mode/perl');
        break;
        case 'bash':
        default:
            session.setMode('ace/mode/plain_text');
    }
}

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            value: '',
            readonly: false,
            height: 0,
            onBlur: function () {}
        };
    },

    // Update code action
    updateCode: function(code) {
        if (code) {
            codeActions.update(code);
        }
    },

    // Set code in component
    setCode: function(code) {
        if (isArray(code)) {
            code = code.join('\n');
        }
        this.editor.setValue(code, -1);
    },

    componentDidMount: function () {
        this.editor = ace.edit(this.getDOMNode());
        this.editSession = this.editor.getSession();

        setLang(this.editSession, this.props.lang);

        this.editor.setTheme('ace/theme/tomorrow');
        this.editor.setReadOnly(this.props.readonly);

        // Give me cmd+l back!
        this.editor.commands.removeCommand('gotoline');

        // Run code bind
        this.editor.commands.addCommand({
            name: 'runCode',
            bindKey: {
                win: 'Ctrl-Return',
                mac: 'Command-Return'
            },
            exec: codeActions.runCode
        });

        this.editor.focus();

        if (this.props.loadCode) {
            this.setCode(this.props.loadCode);
        }
        this.editor.on('blur', (e) => {
            this.updateCode(this.getCode());
        });
    },

    getCode: function() {
        return this.editor.getValue().split('\n');
    },

    componentDidUpdate: function(prevProps) {
        if (!isEqual(this.props.lang, prevProps.lang)) {
            setLang(this.editSession, this.props.lang);
        }
        if (!isEqual(this.props.loadCode, prevProps.loadCode)) {
            if (!isEqual(this.props.loadCode, this.getCode())) {
                this.setCode(this.props.loadCode);
            }
        }
        if (!isEqual(this.props.readonly, prevProps.readonly)) {
            this.editor.setReadOnly(this.props.readonly);
        }
    },

    componentWillUnmount: function () {
        this.editor.destroy();
    },

    render: function () {
        var style = {
            height: (this.props.height) + 'px'
        };

        return (
            <div style={ style } className="ace-editor-wrapper"></div>
        );
    }
});
