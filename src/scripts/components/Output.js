var React = require('react');

var Events = require('./Output/Events');
var { Panel } = require('react-bootstrap');

module.exports = React.createClass({
    render: function () {
        return (
            <Panel className="output">
                <Events
                    events={ this.props.events }
                    archivedEvents={ this.props.archivedEvents }
                />
            </Panel>
        );
    }
});
