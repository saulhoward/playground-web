var React = require('react');
var moment = require('moment');

var Event = React.createClass({
    getDefaultProps: function() {
        return {
            Body: '',
            Timestamp: 0,
            Type: ''
        };
    },

    render: function () {
        var time = moment(this.props.Timestamp).format('h:mm:ss:SS');

        return (
            <div className="event">
                <div className="timestamp">
                    { time }
                </div>
                <div className="body">
                    { this.props.Body }
                </div>
            </div>
        );
    }
});


module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            archivedEvents: [],
            events: [],
        };
    },

    render: function () {
        return (
            <div className="events">
                <div className="events__archived">
                {
                    this.props.archivedEvents.map(a => {
                        return (
                            <div className="events__archived_group">
                            { a.map(e => { return <Event {...e} />; }) }
                            </div>
                        );
                    })
                }
                </div>
                <div className="events__new">
                { this.props.events.map(e => { return <Event {...e} />; }) }
                </div>
            </div>
        );
    }
});
