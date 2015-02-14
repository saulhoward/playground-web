var React = require('react');

var find = require('lodash-node/modern/collections/find');

var codeActions = require('../../actions/code');

var { DropdownButton, MenuItem } = require('react-bootstrap');

const langs = [
    {
        'id': 'ruby',
        'name': 'Ruby'
    },
    {
        'id': 'golang',
        'name': 'Go'
    },
    {
        'id': 'javascript',
        'name': 'JavaScript'
    },
    {
        'id': 'python',
        'name': 'Python'
    },
    {
        'id': 'c',
        'name': 'C'
    },
    {
        'id': 'perl',
        'name': 'Perl'
    },
    {
        'id': 'bash',
        'name': 'Bash'
    }
];

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            lang: '',
        };
    },

    render: function () {
        var lang = find(langs, { 'id': this.props.lang });
        if (!lang) {
            lang = 'undefined';
        }
        var title = 'Lang: ' + lang.name;

        return (
            <DropdownButton title={ title } onSelect={ this.selectLang }>
            {
                langs.map((l, i) => {
                    return (
                        <MenuItem eventKey={ i }>{ l.name }</MenuItem>
                    );
                })
            }
            </DropdownButton>
        );
    },

    selectLang: function(key) {
        codeActions.changeLang(langs[key].id);
    }
});
