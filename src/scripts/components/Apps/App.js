var React = require('react');

var Icon = require('../Icon');
var Confirm = require('../Confirm');

var { isEmpty, find, defaults } = require('lodash-node');

var { ButtonGroup, Button, ButtonToolbar, ModalTrigger } = require('react-bootstrap');

var appsActions = require('../../actions/apps');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            Id: '',
            Description: '',
            Created: 0,
        };
    },

    getInitialState: function() {
        return {
            showDetails: false
        }
    },

    toggleState: function(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ showDetails: !this.state.showDetails });
    },

    render: function () {
        // console.log('rendering app', this.props);
        var source;
        find(this.props.Source, (v, k) => {
            if (!isEmpty(v)) {
                source = defaults(v, { 'type': k });
                return true;
            }
            return false;
        });
        var sourceText;
        switch (source.type) {
            case 'Code':
                sourceText = source.Lang;
                break;
            default:
                sourceText = 'unknown source';
                break;
        }

        return (
            <div className="app" key={ this.props.key }>
                <div className="app__summary">
                    <div className="app__summary__id">
                        <h5>{ this.props.Id }</h5>
                        <p>{ this.props.Description }</p>
                    </div>
                    <div className="app__summary__language">
                        { sourceText }
                    </div>
                    <div className="app__summary__status">
                        Status
                    </div>
                    <div className="app__summary__showDetails">
                        <a href="javascript:" onClick={ this.toggleState }>
                            <Icon name={ this.state.showDetails ? 'ei-chevron-up' : 'ei-chevron-down' } />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
