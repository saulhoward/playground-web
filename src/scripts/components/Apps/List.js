var React = require('react');
var moment = require('moment');
var { forEach } = require('lodash-node');

var App = require('./App');
var { Nav, NavItem } = require('react-bootstrap');

var playgroundActions = require('../../actions/playground');
var { PlaygroundStatus } = require('../../constants');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            apps: [],
        };
    },

    onSelect: function(e) {
        playgroundActions.loadApp(this.props.apps[e].Id);
    },

    render: function () {
        var activeKey = null;
        if (this.props.playgroundStatus != PlaygroundStatus.SCRATCHPAD) {
            forEach(this.props.apps, (a, k) => {
                if (a.Id == this.props.playgroundApp) {
                    activeKey = k;
                }
            });
        }

        return (
            <Nav
                className="apps-list"
                bsStyle="pills"
                stacked
                activeKey={activeKey}
                onSelect={this.onSelect}
            >
                {
                    this.props.apps.map((a, k) => {
                        return (
                            <NavItem className="apps-list__app" eventKey={k} href="/home">
                                <h5>{ a.Id }</h5>
                                <p>{ a.Description }</p>
                            </NavItem>
                        );
                    })
                }
            </Nav>
        );
    }
});
